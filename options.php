<?php
class PublirSettingsPage
{
    /**
     * Holds the values to be used in the fields callbacks
     */
    private $options;

    /**
     * Start up
     */
    public function __construct()
    {
        add_action( 'admin_menu', array( $this, 'add_admin_pages' ) );
        add_action( 'admin_init', array( $this, 'publir_page_init' ) );
    }

    /**
     * Add options page
     */
    public function add_plugin_page()
    {
        // This page will be under "Settings"
        add_options_page(
            'Settings Admin', 
            'Publir', 
            'manage_options', 
            'pb-admin', 
            array( $this, 'publir_create_admin_page' )
        );
    }

    /**
     * Options page callback
     */
    public function publir_create_admin_page()
    {
        // Set class property
        $this->options = get_option( 'publir_wp_options' );
        ?>
        <div class="wrap">
            <h1>Publir Settings</h1>
            <form method="post" action="options.php">
            <?php
                // This prints out all hidden setting fields
                settings_fields( 'basic_info' );
                do_settings_sections( 'pb-admin' );
                submit_button();
            ?>
            </form>
            <!-- <h3>Use Following Shortcode</h3>
            <h3>For Login Form - [pb_login]</h3>
            <h3> Update Password - [pb_update_password]</h3>
            <h3>Reset Password Form - [pb_reset_password]</h3>
            <h3>Cancel Subscription - [pb_cancel_subscription]</h3> -->
        </div>
        <?php
    }

    /**
     * Register and add settings
     */
    public function publir_page_init()
    {   
        add_action('admin_menu', array($this, 'add_admin_pages') );
        register_setting(
            'basic_info', // Option group
            'publir_wp_options', // Option name
            array( $this, 'sanitize' ) // Sanitize
        );

        add_settings_section(
            'setting_section_id', // ID
            '', // Title
            array( $this, 'print_section_info' ), // Callback
            'pb-admin' // Page
        );  

        add_settings_field(
            'publir_site_id', // ID
            'Enter Your Publir Site Id:', // Title 
            array( $this, 'publir_site_id_callback' ), // Callback
            'pb-admin', // Page
            'setting_section_id' // Section           
        );  
        register_setting(
            'page_info', // Option group
            'publir_wp_options', // Option name
            array( $this, 'sanitize' ) // Sanitize
        );

        add_settings_section(
            'setting_page_id', // ID
            '', // Title
            array( $this, 'page_section_info' ), // Callback
            'pb-admin' // Page
        );  

        add_settings_field(
            'setting_page_id', // ID
            'Enter Your Subscriptions Login Page URL:', // Title 
            array( $this, 'publir_site_page_callback' ), // Callback
            'pb-admin', // Page
            'setting_page_id' // Section           
        );      

     
    }

    /**
     * Add Admin Menu to the Page
    */
    public function add_admin_pages(){
        add_menu_page('Publir Plugin','Publir', 'manage_options', 'pb-admin', array( $this, 'publir_create_admin_page' ), 'dashicons-store', 110);
    }

    /**
     * Sanitize each setting field as needed
     *
     * @param array $input Contains all settings fields as array keys
     */
    public function sanitize( $input )
    {
        $new_input = array();
        if( isset( $input['publir_site_id'] ) )
            $new_input['publir_site_id'] = sanitize_text_field( $input['publir_site_id'] );

        if( isset( $input['setting_page_id'] ) )
            $new_input['setting_page_id'] = sanitize_text_field( $input['setting_page_id'] );

        if( isset( $input['title'] ) )
            $new_input['title'] = sanitize_text_field( $input['title'] );


        $file = plugin_dir_path( __FILE__ ) . '/publir.txt'; 
        $open = fopen( $file, "w" ); 
        $write = fputs( $open, $new_input['publir_site_id']); 
        fclose( $open );

        add_filter( 'upload_dir', array($this,'my_org_logos_upload_dir' ) ) ;

        $url = 'https://fkrkkmxsqeb5bj9r.s3.amazonaws.com/'.sanitize_text_field( $input['publir_site_id']).'.js';

        $pathToMksFile = plugin_dir_path( __FILE__ ) . 'js/mks.js';
        $contentMksFile = file_get_contents($pathToMksFile);
        $upload = wp_upload_dir();
        $filename = sanitize_text_field( $input['publir_site_id']).'.js';
        
        if(! file_exists($upload['path'].'/'.$filename)){
            $url1 = wp_remote_get($url);
            $content = wp_remote_retrieve_body( $url1 );
            if(!empty($content)){   
                $pAnalyticsUrl = admin_url('admin-ajax.php').'?action=publir_adblock_pAnalytics_callback_action';
                $content1 = str_replace("https://l026e7vji8.execute-api.us-east-1.amazonaws.com/default/pAnalytics",$pAnalyticsUrl,$content);

                $content2 = str_replace($contentMksFile,"/wp-content/uploads/mks.js",$content1);
                $ret = wp_upload_bits( $filename, null, $content2 );
            }

        }
        
        $mks_filename = 'mks.js';
        if(!file_exists($upload['path'].'/'.$mks_filename)){
            $ret = wp_upload_bits( $mks_filename, null, $contentMksFile );
        }
        remove_filter( 'upload_dir', array($this,'my_org_logos_upload_dir' ));
        return $new_input;
    }

    /** 
     * Print the Section text
     */
    public function print_section_info()
    {
        //print 'Enter your Publir Site Id below :';
    }

    public function page_section_info()
    {
        //print 'Select a page to manage Publir Setting:';
    }
    /** 
     * Get the settings option array and print one of its values
     */
    public function publir_site_id_callback()
    {
        printf(
            '<input type="text" id="publir_site_id" name="publir_wp_options[publir_site_id]" value="%s" required autocomplete="off" />',
            isset( $this->options['publir_site_id'] ) ? esc_attr( $this->options['publir_site_id']) : ''
        );
    }

    public function publir_site_page_callback(){
        printf(
            '<input type="text" id="title" name="publir_wp_options[setting_page_id]" autocomplete="off" value="%s" required />',
            isset( $this->options['setting_page_id'] ) ? esc_attr( $this->options['setting_page_id']) : ''
        );
    }
    /** 
     * Get the settings option array and print one of its values
     */
    public function title_callback()
    {
        printf(
            '<input type="text" id="title" name="my_option_name[title]" value="%s" />',
            isset( $this->options['title'] ) ? esc_attr( $this->options['title']) : ''
        );
    }
    public function my_org_logos_upload_dir( $upload ) {
        $upload['subdir'] = '/';
        $upload['path']       = $upload['basedir'] . $upload['subdir'];
        $upload['url']        = $upload['baseurl'] . $upload['subdir'];
        return $upload;
    }
}
if( is_admin() )
    $my_settings_page = new PublirSettingsPage();
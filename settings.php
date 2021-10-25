<?php

/**
 * ILC Tabbed Settings Page
 */

add_action( 'init', 'publir_ilc_admin_init' );
add_action( 'admin_menu', 'publir_ilc_settings_page_init' );
if ( ! function_exists( 'publir_ilc_admin_init' ) )  {
    /**
    * Sets up theme defaults and registers support for various WordPress features
    *
    *  It is important to set up these functions before the init hook so that none of these
    *  features are lost.
    */
	function publir_ilc_admin_init() {
		$settings = get_option( "ilc_theme_settings" );
		if ( empty( $settings ) ) {
			$settings = array(
				'ilc_intro' => 'Some intro text for the home page',
				'ilc_tag_class' => false,
				'ilc_ga' => false,
				'publir_site_id'=>false
			);
			add_option( "ilc_theme_settings", $settings, '', 'yes' );
		}	
	}
}

if ( ! function_exists( 'publir_ilc_settings_page_init' ) )  {
    /**
    * Sets up theme defaults and registers support for various WordPress features
    *
    *  It is important to set up these functions before the init hook so that none of these
    *  features are lost.
    */
	function publir_ilc_settings_page_init() {
		$theme_data = [];//get_theme_data( TEMPLATEPATH . '/style.css' );
		$settings_page = add_options_page( ' Publir Settings', ' Publir Settings', 'manage_options', 'pb-admin', 'publir_ilc_settings_page' );
		add_action( "load-{$settings_page}", 'publir_ilc_load_settings_page' );
	}
}

if ( ! function_exists( 'publir_ilc_load_settings_page' ) )  {
    /**
    * Sets up theme defaults and registers support for various WordPress features
    *
    *  It is important to set up these functions before the init hook so that none of these
    *  features are lost.
    */
	function publir_ilc_load_settings_page() {
		if ( $_POST["ilc-settings-submit"] == 'Y' ) {
			check_admin_referer( "ilc-settings-page" );
			publir_ilc_save_theme_settings();
			$url_parameters = isset($_GET['tab'])? 'updated=true&tab='.sanitize_text_field($_GET['tab']) : 'updated=true';
			wp_redirect(admin_url('options-general.php?page=pb-admin&'.$url_parameters));
			exit;
		}
	}
}

if ( ! function_exists( 'publir_ilc_save_theme_settings' ) )  {
    /**
    * Sets up theme defaults and registers support for various WordPress features
    *
    *  It is important to set up these functions before the init hook so that none of these
    *  features are lost.
    */
	function publir_ilc_save_theme_settings() {
		global $pagenow;
		$settings = get_option( "ilc_theme_settings" );
		if ( $pagenow == 'options-general.php' && $_GET['page'] == 'pb-admin' ){ 
			if ( isset ( $_GET['tab'] ) )
		        $tab = sanitize_text_field($_GET['tab']); 
		    else
		        $tab = 'homepage'; 

		    $general_value = '';
		    if( $tab == 'general' ) {
		    	if( !empty( $_POST['ilc_tag_class'] ) )
		    		$general_value = sanitize_text_field($_POST['ilc_tag_class']);
		    }

		    $footer_value = '';
		    if( $tab == 'footer' ) {
		    	if( !empty( $_POST['ilc_ga'] ) )
		    		$footer_value = sanitize_text_field($_POST['ilc_ga']);
		    }

		    $homepage_value = '';
		    if( $tab == 'homepage' ) {
		    	if( !empty( $_POST['ilc_intro'] ) )
		    		$homepage_value = sanitize_text_field($_POST['ilc_intro']);
		    }

		    $setting_value = '';
		    if( $tab == 'general' ) {
		    	if( !empty( $_POST['publir_site_id'] ) )
		    		$setting_value = sanitize_text_field($_POST['publir_site_id']);
		    }
		    switch ( $tab ){ 
		        case 'general' :
					$settings['ilc_tag_class']	  = $general_value ;
				break; 
		        case 'footer' : 
					$settings['ilc_ga']  = $footer_value;
				break;
				case 'homepage' : 
					$settings['ilc_intro']	  = $homepage_value;
				case 'pb_setting' : 
					$settings['publir_site_id']	  = $setting_value;
				break;
		    }

		}
		
		if( !current_user_can( 'unfiltered_html' ) ){
			if ( $settings['ilc_ga']  )
				$settings['ilc_ga'] = stripslashes( esc_textarea( wp_filter_post_kses( $settings['ilc_ga'] ) ) );
			if ( $settings['ilc_intro'] )
				$settings['ilc_intro'] = stripslashes( esc_textarea( wp_filter_post_kses( $settings['ilc_intro'] ) ) );
		}
		
		$updated = update_option( "ilc_theme_settings", $settings );
	}
}

if ( ! function_exists( 'publir_ilc_admin_tabs' ) )  {
    /**
    * Sets up theme defaults and registers support for various WordPress features
    *
    *  It is important to set up these functions before the init hook so that none of these
    *  features are lost.
    */
	function publir_ilc_admin_tabs( $current = 'homepage' ) { 
	    $tabs = array( 'homepage' => 'Home', 'general' => 'General', 'footer' => 'Footer','pb_setting'=>'Publir Settings' ); 
	    $links = array();
	    _e('<div id="icon-themes" class="icon32"><br></div>');
	    _e('<h2 class="nav-tab-wrapper">');
	    foreach( $tabs as $tab => $name ){
	        $class = ( $tab == $current ) ? ' nav-tab-active' : '';
	        echo "<a class='nav-tab".esc_attr($class)."' href='?page=pb-admin&tab=".esc_attr($tab)."'>".esc_attr($name)."</a>";
	        
	    }
	    _e('</h2>');
	}
}

function publir_ilc_settings_page() {
	
}


?>
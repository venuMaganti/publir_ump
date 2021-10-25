<?php
// Main Publir File Insert
if ( ! function_exists( 'publir_enqueue_script' ) )  {
	/**
	* Sets up theme defaults and registers support for various WordPress features
	*
	*  It is important to set up these functions before the init hook so that none of these
	*  features are lost.
	*/
	function publir_enqueue_script() {
		$options = get_option('publir_wp_options');
		$option = $options['publir_site_id'];
		if($option){
			$src = '//a.publir.com/platform/'.$option.'.js';
			wp_enqueue_script( 'publir-script', $src , array(), '1.0', false );
			wp_add_inline_script( 'publir-script', 'var googletag = googletag || {};googletag.cmd = googletag.cmd || [];' );

			$file = plugin_dir_path( __FILE__ ) . '/assets/js/publirmain.js';
			$line=3; //includes zero as 1.
			$newdata = "var p_siteId ='".$option."';var publirSiteID = '".$option."';";
			$data=file($file);
			$data[$line]=$newdata."\r\n";
			$data=implode($data);
			file_put_contents($file,$data);
			wp_enqueue_script( 'publir-main-script', plugin_dir_url( __FILE__ ) . '/assets/js/publirmain.js', array('jquery'));
	        $upload = wp_upload_dir();
			$filename = $option.'.js';
			if(! file_exists($upload['path'].'/'.$filename)){
				wp_enqueue_script( 'publir-site-script', $upload['baseurl'] . '/'.$filename);
			}
		} 
	  
	}
}	
add_action( 'wp_enqueue_scripts', 'publir_enqueue_script' );
	
// Async load
if ( ! function_exists( 'publir_async_scripts' ) )  {
	/**
	* Sets up theme defaults and registers support for various WordPress features
	*
	*  It is important to set up these functions before the init hook so that none of these
	*  features are lost.
	*/
	function publir_async_scripts($url)
	{
	    $options = get_option('publir_wp_options');
		$site_id = $options['publir_site_id'].'.js';

	    if ( strpos( $url, 'publir.com') == true || strpos( $url, $site_id) == true ){

	        return $url."' async='async"; 
	    }else{
	    	return $url;
	    }
	}
}
add_filter( 'clean_url', 'publir_async_scripts', 11, 1 );

if ( ! function_exists( 'publir_enqueue_admin_script' ) )  {
	/**
	* Sets up theme defaults and registers support for various WordPress features
	*
	*  It is important to set up these functions before the init hook so that none of these
	*  features are lost.
	*/
	function publir_enqueue_admin_script() {
		wp_enqueue_script( 'stripe-js', 'https://js.stripe.com/v3/', array('jquery'),date('his'));
		
		wp_register_script( 'publir_admin_script',  plugin_dir_url( __FILE__ ) . '/assets/js/ump.js', array('jquery'),date('his'));
		wp_enqueue_script( 'publir_admin_script' );
		wp_localize_script( 'publir_admin_script', 'pblir_ajax', array( 'ajax_url' => admin_url('admin-ajax.php')) );
	    wp_register_style( 'publir_admin_css', plugin_dir_url( __FILE__ ) . '/assets/css/admin-ump.css', false );
	    wp_enqueue_style( 'publir_admin_css' );
	}
}
add_action( 'wp_enqueue_scripts', 'publir_enqueue_admin_script' );

add_action('init', 'publir_start_session', 99);

if ( ! function_exists( 'publir_start_session' ) )  {
	/**
	* Sets up theme defaults and registers support for various WordPress features
	*
	*  It is important to set up these functions before the init hook so that none of these
	*  features are lost.
	*/
	function publir_start_session() {
		if(!session_id()) {
			session_start();
			if($_SESSION['pblogin'] != true){
				$_SESSION['pblogin'] = false;
			}
		}
		require_once( ABSPATH . 'wp-admin/includes/post.php' );
		$options = get_option('publir_wp_options');
		$page_name = $options['setting_page_id'];
		if($page_name !=""){
			
			$my_post = array(
				'post_title'   	=> wp_strip_all_tags( $page_name ),
				'post_content' 	=> '',
				'post_type'		=>'page',
				'post_status'   => 'publish',
			  	'post_author'   => 1
			);
	 		// Update the post into the database
	 		if(post_exists( $page_name,'','','page')){
	 			wp_update_post( $my_post,true );
	 		}else{
	 			$post_id = wp_insert_post($my_post,true);
	 			update_post_meta( $post_id, '_wp_page_template', plugin_dir_path( __FILE__ ) . '/ump-page-template.php' );
	 		}
	  		
	  		
		}
	    
	}
}

add_filter( 'theme_page_templates', 'publir_addpage_template_todropdown' );

if ( ! function_exists( 'publir_addpage_template_todropdown' ) )  {
	/**
	* Sets up theme defaults and registers support for various WordPress features
	*
	*  It is important to set up these functions before the init hook so that none of these
	*  features are lost.
	*/
	
	function publir_addpage_template_todropdown( $templates )
	{
	   $templates[plugin_dir_path( __FILE__ ) . '/ump-page-template.php'] = __( 'Publir Action', 'publir' );
	 
	   return $templates;
	}
}

add_filter( 'template_include', 'publir_change_page_template', 99 );

if ( ! function_exists( 'publir_change_page_template' ) )  {
	/**
	* Sets up theme defaults and registers support for various WordPress features
	*
	*  It is important to set up these functions before the init hook so that none of these
	*  features are lost.
	*/

	function publir_change_page_template($template)
	{
		$options = get_option('publir_wp_options');
		$page_name = $options['setting_page_id'];
	    if (get_the_title(get_the_ID()) == $page_name) {
	        $meta = get_post_meta(get_the_ID());
	        if (!empty($meta['_wp_page_template'][0]) && $meta['_wp_page_template'][0] != $template) {
	            $template = $meta['_wp_page_template'][0];
	        }
	    }
	    return $template;
	}
}
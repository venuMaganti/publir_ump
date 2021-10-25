<?php
/*
Template Name:Publir Action

*/
get_header();
if( isset($_SESSION['login_data']) ) {
    if( isset($_SESSION['login_data']['status']) ) {
        if( $_SESSION['login_data']['status'] == '0') {
                $_SESSION['account_cancel'] = 1;
        }
    }
}
?>
<div class="entry-content row">
    
    <div class="publir-tabset">
    <?php if(isset($_SESSION['pblogin']) && $_SESSION['pblogin'] == true) { ?>
        <input type="radio" name="tabset" aria-controls="home" checked> 
        <label for="tab1" class="width-20 home-tab">Home</label> 
        <input type="radio" name="tabset"  aria-controls="logout-publir"> 
        <label for="tab2" class="width-20 home-tab" id="logout-publir">Log Out</label> 
        <div class="tab-panels">
            <section id="home" class="tab-panel">
        <?php
        if(isset($_SESSION['account_cancel']) &&  $_SESSION['account_cancel'] == 1){
            $plan_type = "";
            if( !empty($_SESSION['login_data']) ) {
                if( !empty($_SESSION['login_data']['plan_type']) ) 
                    $plan = sanitize_text_field($_SESSION['login_data']['plan_type']);
            }
            if( $plan != "Free" ) {
                _e('<p>Your account has been cancelled, and you will no longer be charged going forward.</p>');
                _e('<p>You will still be able to access the Ad-free site Ad-free until your account expires on:'.esc_attr(date('M d, Y',$_SESSION['login_data']['nextChargeDate'])).'</p>');
                _e('<p>If you change your mind, you can always come back to this page to re-activate your account.</p> <br />');
                _e("<h6>Update your Card to activate your account</h6><br />");
                _e(do_shortcode('[publir_update_card]'));
             } else if( $plan == "Free" ) {
                _e('<p>Your account has been cancelled.</p>');
                _e('<p>If you change your mind, you can always come back to this page to re-activate your account.</p> <br />');
             } else {
                _e('<p>Somethings went wrong!</p>');
                _e('<p>Try <a href="javascript:void(0);" id="logout-publir">re-login</a> to update your account.</p></p>');
             }
        }else{ ?> 
            <h6>Ad-Free Subscription</h6>
            <p>Thank you for subscribing to receive an Ad-free experience.</p> <p>Your subscription details are as follows:</p>
            <?php
            if( isset($_SESSION['login_data']) && $_SESSION['login_data']['plan_type'] != 'Free' ) {
            	
                $card_type = sanitize_text_field($_SESSION['login_data']['card_type']);
                
                $card_last4 = sanitize_text_field($_SESSION['login_data']['card_last4']);
                
                $plan_type = sanitize_text_field($_SESSION['login_data']['plan_type']);
                
                $amount = sanitize_text_field($_SESSION['login_data']['amount']);
                
                $nextChargeDate = sanitize_text_field($_SESSION['login_data']['nextChargeDate']);
          
                $siteSubData = publir_get_site_subs_data();
                if( $plan_type == "Life" ) {
            ?>
            <br>
                <div class="row">
                <div class="col-sm-5">
                <b>Billing Frequency</b>
                </div>
                <div class="col-sm-5">
                <p>One Time</p>    
                </div>
                </div>
                <br>
            <?php 
                _e(do_shortcode('[publir_update_password]') );
            } else { ?>
            <br>
            <div class="row">
                <div class="col-sm-5">
                <b>Card Type</b>
                </div>
                <div class="col-sm-5">
                <p><?php _e(esc_attr($card_type));?> </p>
                </div>
                <div class="col-sm-5">
                <b>Last 4 Digits</b>
                </div>
                <div class="col-sm-5">
                <p><?php _e( esc_attr( $card_last4) ); ?> </p>
                </div>
                <div class="col-sm-5">
                <b>Billing Frequency</b>
                </div>
                <div class="col-sm-5">
                <p><?php _e( esc_attr ($plan_type) ); ?> </p>
                </div>
                <div class="col-sm-5">
                <b>Next Renewal Date</b>
                </div>
                <div class="col-sm-5">
                <p><?php _e( esc_attr( date('M d, Y', $nextChargeDate) ) );?> </p>
                </div>
                <div class="col-sm-5">
                <b>Next Renewal Amount</b>
                </div>
                <div class="col-sm-5">
                <p><?php _e( esc_attr ( $siteSubData['currencySymbol'] .''. $amount ) ); ?> </p>
                </div>
            </div>
            <br>
                <?php
                _e(do_shortcode('[publir_update_password]') );
                _e(do_shortcode('[publir_update_card]'));
                _e(do_shortcode('[publir_cancel_subscription]'));
            }
            } else if( $_SESSION['login_data']['plan_type'] == 'Free' ) {
                $card_type = "";
                $card_last4 = "";
                $plan_type = "";
                $amount = "";
                $nextChargeDate = "";
            ?>
                <br>
                <div class="row">
                <div class="col-sm-5">
                <b>Billing Frequency</b>
                </div>
                <div class="col-sm-5">
                <p>Limited Access (Free)</p>    
                </div>
                </div>
                <br>
            <?php
                _e(do_shortcode('[publir_update_password]') );
            }
            ?>
         </section>
        </div>
        <br>
        <?php
        
        }
        }else{ ?>
        

        <input type="radio" name="tabset" id="tab1" aria-controls="login" checked> 
        <label for="tab1">Login</label> 
        <input type="radio" name="tabset" id="tab2" aria-controls="register"> 
        <label for="tab2">Subscribe</label> 
        <input type="radio" name="tabset" id="tab3" aria-controls="reset-password"> 
        <label for="tab3">Forgot Password?</label>
    
        <div class="tab-panels">
            <section id="login" class="tab-panel">
            <?php _e(do_shortcode('[publir_login]'));?>
            <?php if(!isset($_COOKIE['publir_subscriber'])) { ?>
             <p>Not a subscriber yet? <a href="javascript:void();" class="signup">Sign-up.</a></p>
             <p>Misplaced your password? <a href="javascript:void();" class="request-passowrd">Request new password.</a></p>
             <?php } ?>
            </section>
            <section id="register" class="tab-panel"><?php _e(do_shortcode('[publir_register]'));?></section>
            <section id="reset-password" class="tab-panel"><?php _e(do_shortcode('[publir_reset_password]'));?> </section>
        </div>
    <?php } ?>
       
    </div>
</div>
<?php
if ( ! function_exists( 'publir_get_site_subs_data' ) )  {
    function publir_get_site_subs_data()
    {
        $options = get_option('publir_wp_options');
        $site_id = sanitize_text_field($options['publir_site_id']);
        $fileUrl = "https://a.publir.com/subscriptions/" . $site_id . ".json";
        $responseData = wp_remote_get($fileUrl);
        $response = wp_remote_retrieve_body( $responseData );
        $siteSubData = json_decode($response, true);
        return $siteSubData;
    }
}
get_footer();
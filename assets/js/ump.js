jQuery(document).ready(function(){
  
  //jQuery('head').append(ads);
  /***
  * Login Ajax
  ***/
  jQuery('.autoDisable').attr('autocomplete','off');
  jQuery('#login-form').submit(function(e){
        e.preventDefault();
        jQuery('.login-loader').show();
        jQuery('input[type="submit"]').prop('disabled', true);
        var login_frm = jQuery('#login-form');
        //Validation
        var htm = '';
        if(!jQuery("#ump-username").val()){
            jQuery("#ump-username").addClass('error');
            jQuery('.login-loader').hide();
            jQuery('input[type="submit"]').prop('disabled', false);
            // htm = '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">x</button>';
            // htm += 'Please enter email!';
            jQuery(".login-response").addClass('error');
            jQuery('.login-response').html("<p>Please enter email!</p>");
            jQuery('.login-response').show();
            return false;
        }else{
            if( !validateEmail( jQuery("#ump-username").val() ) ) {
                jQuery(".login-response").addClass("error");
                jQuery(".login-response").html("<p>Email is not valid</p>");
                jQuery("#ump-username").addClass('error');
                jQuery('.login-loader').hide();
                jQuery('input[type="submit"]').prop('disabled', false);
                return false;
            }
            jQuery("#ump-username").removeClass('error');
            jQuery(".login-response").hide();
            jQuery('.login-response').html('<p></p>');
            jQuery('.login-response').removeClass('error');
        }
        if(!jQuery("#ump-password").val()){
            jQuery("#ump-password").addClass('error');
            // htm = '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">x</button>';
            // htm += 'Please enter password!';
            jQuery(".login-response").addClass('error');
            jQuery('.login-response').html("<p>Please enter password!</p>");
            jQuery('.login-response').show();
            jQuery('.login-loader').hide();
            jQuery('input[type="submit"]').prop('disabled', false);
            return false;
        }else{
            jQuery("#ump-password").removeClass('error');
            jQuery('.login-response').html('<p></p>');
            jQuery(".login-response").hide();
        }
        //ajax submit form
        jQuery.ajax({
            type: "POST",
            url:login_frm.attr('action'),
            data: login_frm.serialize(), // serializes the form's elements.
            success: function(response)
            {
                jQuery('.login-loader').hide();
                if( jQuery.trim(response) != "" ) {
                    var data = JSON.parse(response);
                    if(data.type == 'success' ){
                        jQuery('.login-response').html('<p>'+data.message+'</p>');
                        jQuery('.login-response').show();
                        setTimeout(function(){
                            location.reload();
                        }, 1000);
                    } else {
                        // htm = '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">x</button>';
                        // htm += data.message;
                        jQuery(".login-response").addClass('error');
                        jQuery('.login-response').html('<p>'+data.message+'</p>');
                        jQuery('.login-response').show();
                    }
                } else {
                    // htm = '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">x</button>';
                    // htm += '<p>Connection error occured. Please try agin after some time or do refresh page</p>';
                    jQuery(".login-response").addClass('error');
                    jQuery('.login-response').html('<p>Connection error occured. Please try agin after some time or do refresh page</p>');
                    jQuery('.login-response').show();
                }
            },
            error: function (jqXHR, exception) {
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connect.\n Verify Network.';
                } else if (jqXHR.status == 404) {
                    msg = 'Requested page not found.';
                } else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n';// + jqXHR.responseText;
                }
                jQuery('.login-loader').hide();
                // htm = '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">x</button>';
                // htm += '<p>' + msg+' Try page reload.</p>';
                jQuery(".login-response").addClass('error');
                jQuery('.login-response').html('<p>' + msg+' Try page reload.</p>');
                jQuery('.login-response').show();
            }
        });
        jQuery('input[type="submit"]').prop('disabled', false);
  });
  /***
  * Login Ajax Completed
  ***/

  /***
  * Logout Ajax
  ***/
  jQuery('#logout-publir').click(function(e){
      e.preventDefault();
      jQuery.ajax({
          type: "POST",
          url:pblir_ajax.ajax_url,
          data:{action:'publir_logout_publir'},
          success: function(response) {
              location.reload();
          },
          error: function (jqXHR, exception) {
              var msg = '';
              if (jqXHR.status === 0) {
                  msg = 'Not connect.\n Verify Network.';
              } else if (jqXHR.status == 404) {
                  msg = 'Requested page not found.';
              } else if (jqXHR.status == 500) {
                  msg = 'Internal Server Error';
              } else if (exception === 'parsererror') {
                  msg = 'Requested JSON parse failed.';
              } else if (exception === 'timeout') {
                  msg = 'Time out error.';
              } else if (exception === 'abort') {
                  msg = 'Ajax request aborted.';
              } else {
                  msg = 'Uncaught Error.\n';// + jqXHR.responseText;
              }
              jQuery(".pblr-cancel-response").addClass('error');
              jQuery('.pblr-cancel-response').html('<p>'+msg+' Try page reload</p>');
              jQuery('.pblr-cancel-response').show();
          }
      });
  });
  /***
  * Logout Ajax completed
  ***/

  /***
  * Upadte Password Ajax
  ***/
  jQuery('#update-pass').submit(function(e){
      e.preventDefault();
      var update_pass = jQuery('#update-pass');
      //Validation
      jQuery('.update-pass').show();
      jQuery('input[type="submit"]').prop('disabled', true);
      if(!jQuery("#ump-password2").val()){
          jQuery('.update-pass').hide();
          jQuery('input[type="submit"]').prop('disabled', false);
          jQuery("#ump-password2").addClass('error');
          jQuery(".pblr-update-response").addClass("error");
          jQuery(".pblr-update-response").html('<p>Old password field required</p>');
          jQuery("#ump-password2").val("");
          jQuery("#ump-newpassword").val("");
          jQuery("#ump-repassword").val("");
          return false;
      } else{
          jQuery(".pblr-update-response").removeClass("error");
          jQuery(".pblr-update-response").html('<p></p>');
          jQuery("#ump-password2").removeClass('error');
      }
      if(!jQuery("#ump-newpassword").val()){
          jQuery('.update-pass').hide();
          jQuery('input[type="submit"]').prop('disabled', false);
          jQuery(".pblr-update-response").addClass("error");
          jQuery(".pblr-update-response").html('<p>New password field required</p>');
          jQuery("#ump-newpassword").addClass('error');
          jQuery("#ump-password2").val("");
          jQuery("#ump-newpassword").val("");
          jQuery("#ump-repassword").val("");
          return false;
      } else{
          jQuery(".pblr-update-response").removeClass("error");
          jQuery(".pblr-update-response").html('<p></p>');
          jQuery("#ump-newpassword").removeClass('error');
      }
      if(!jQuery("#ump-repassword").val()){
          jQuery('.update-pass').hide();
          jQuery('input[type="submit"]').prop('disabled', false);
          jQuery("#ump-repassword").addClass('error');
          jQuery(".pblr-update-response").addClass("error");
          jQuery(".pblr-update-response").html('<p>Confirm password field required</p>');
          jQuery("#ump-password2").val("");
          jQuery("#ump-newpassword").val("");
          jQuery("#ump-repassword").val("");
          return false;
      }else{
          jQuery(".pblr-update-response").removeClass("error");
          jQuery(".pblr-update-response").html('<p></p>');
          jQuery("#ump-repassword").removeClass('error');
      }
      if( jQuery("#ump-repassword").val() != jQuery("#ump-newpassword").val() ) {
          jQuery('.update-pass').hide();
          jQuery('input[type="submit"]').prop('disabled', false);
          jQuery(".pblr-update-response").addClass("error");
          jQuery(".pblr-update-response").html('<p>Password and Confirm password does not match!</p>');
          jQuery("#ump-password2").val("");
          jQuery("#ump-newpassword").val("");
          jQuery("#ump-repassword").val("");
          return false;
      } else {
          jQuery(".pblr-update-response").removeClass("error");
          jQuery(".pblr-update-response").html('<p></p>');
      }
      //ajax submit form
      jQuery.ajax({
          type: "POST",
          url:update_pass.attr('action'),
          data: update_pass.serialize(), // serializes the form's elements.
          success: function(response) {
              jQuery('.update-pass').hide();
              if( jQuery.trim(response)  != "" ) {
                  var data = JSON.parse(response);
                  if(data.type == 'success' ){
                      jQuery('.pblr-update-response').html('<p>'+data.message+'</p>');
                      jQuery('.pblr-update-response').show();
                  } else {
                      jQuery(".pblr-update-response").addClass("error");
                      jQuery('.pblr-update-response').html('<p>'+data.message+'</p>');
                      jQuery('.pblr-update-response').show();
                  }
                  setTimeout(function(){
                      location.reload();
                  }, 2000);
              } else {
                  jQuery(".pblr-update-response").addClass("error");
                  jQuery('.pblr-update-response').html('<p>Connection error occured. Please try agin after some time or do refresh page.</p>');
                  jQuery('.pblr-update-response').show();
              } 
          },
          error: function (jqXHR, exception) {
              jQuery('.update-pass').hide();
              var msg = '';
              if (jqXHR.status === 0) {
                  msg = 'Not connect.\n Verify Network.';
              } else if (jqXHR.status == 404) {
                  msg = 'Requested page not found.';
              } else if (jqXHR.status == 500) {
                  msg = 'Internal Server Error';
              } else if (exception === 'parsererror') {
                  msg = 'Requested JSON parse failed.';
              } else if (exception === 'timeout') {
                  msg = 'Time out error.';
              } else if (exception === 'abort') {
                  msg = 'Ajax request aborted.';
              } else {
                  msg = 'Uncaught Error.\n';// + jqXHR.responseText;
              }
              jQuery(".pblr-update-response").addClass("error");
              jQuery('.pblr-update-response').html('<p>'+msg+' Try page reload</p>');
              jQuery('.pblr-update-response').show();
          }
      });
      jQuery('input[type="submit"]').prop('disabled', false);
  });
  /***
  * Upadte Password Ajax Completed 
  ***/
  
  /***
  * Password reset Ajax
  ***/
  jQuery('#reset-form').submit(function(e){
      e.preventDefault();
      jQuery('.reset-loader').show();
      jQuery('input[type="submit"]').prop('disabled', true);
      var reset_frm = jQuery('#reset-form');
      //Validation
      if(!jQuery("#ump-email").val()){
          jQuery('.reset-loader').hide();
          jQuery('input[type="submit"]').prop('disabled', false);
          jQuery(".pblr-reset-response").addClass("error");
          jQuery(".pblr-reset-response").html("<p>Email is required</p>");
          jQuery("#ump-email").addClass('error');
          return false;
      }else{
          if( !validateEmail( jQuery( "#ump-email" ).val() ) ) {
              jQuery('.reset-loader').hide();
              jQuery('input[type="submit"]').prop('disabled', false);
              jQuery(".pblr-reset-response").addClass("error");
              jQuery(".pblr-reset-response").html("<p>Email is not valid</p>");
              jQuery("#ump-email").addClass('error');
              return false;
          } else {
              jQuery("#ump-email").removeClass('error');
              jQuery(".pblr-reset-response").html("<p></p>");
              jQuery(".pblr-reset-response").removeClass("error");
          }
      }
      // console.log(jQuery('#reset-form').serialize());
      //ajax submit form
      jQuery.ajax({
          type: "POST",
          url:reset_frm.attr('action'),
          data: reset_frm.serialize(), // serializes the form's elements.
          success: function(response) {
            jQuery('.reset-loader').hide();
            if( jQuery.trim(response)  != "" ) {
              var data = JSON.parse(response);
              if(data.type == 'success' ){
                  jQuery('.pblr-reset-response').html('<p>'+data.message+'</p>');
                  jQuery('.pblr-reset-response').show();
                  setTimeout(function(){
                    location.reload();
                  }, 2000);
              } else {
                  jQuery(".pblr-reset-response").addClass("error");
                  jQuery('.pblr-reset-response').html('<p>'+data.message+'</p>');
                  jQuery('.pblr-reset-response').show();
              }
            } else {
                jQuery(".pblr-reset-response").addClass("error");
                jQuery('.pblr-reset-response').html('<p>Connection error occured. Please try agin after some time or do refresh page.</p>');
                jQuery('.pblr-reset-response').show();
            }
          },
          error: function (jqXHR, exception) {
              var msg = '';
              if (jqXHR.status === 0) {
                  msg = 'Not connect.\n Verify Network.';
              } else if (jqXHR.status == 404) {
                  msg = 'Requested page not found.';
              } else if (jqXHR.status == 500) {
                  msg = 'Internal Server Error';
              } else if (exception === 'parsererror') {
                  msg = 'Requested JSON parse failed.';
              } else if (exception === 'timeout') {
                  msg = 'Time out error.';
              } else if (exception === 'abort') {
                  msg = 'Ajax request aborted.';
              } else {
                  msg = 'Uncaught Error.\n';// + jqXHR.responseText;
              }
              jQuery('.reset-loader').hide();
              jQuery(".pblr-reset-response").addClass("error");
              jQuery('.pblr-reset-response').html('<p>'+msg+' Try page reload.</p>');
              jQuery('.pblr-reset-response').show();
          }
      });
      jQuery('input[type="submit"]').prop('disabled', false);
  });

  /***
  * Password reset Ajax Completed
  ***/
  jQuery('#updatecardform').submit(function(e){
      e.preventDefault();
      var updatecard_frm = jQuery('#updatecardform');
      jQuery('.reset-loader').show();
      jQuery('input[type="submit"]').prop('disabled', true);
      //ajax submit form
      jQuery.ajax({
          type: "POST",
          url:updatecard_frm.attr('action'),
          data: updatecard_frm.serialize(), // serializes the form's elements.
          success: function(response) {
              if( jQuery.trim(response) != "" ) {
                  var data = JSON.parse(response);
                  jQuery('.reset-loader').hide();
                  if(data.type == 'success' ){
                      jQuery('.pblr-card-response').html('<p>'+data.message+'</p>');
                      jQuery('.pblr-card-response').show();
                      setTimeout(function(){
                        location.reload();
                      }, 2000);
                  } else {
                      jQuery(".pblr-card-response").addClass("error");
                      jQuery('.pblr-card-response').html('<p>'+data.message+'</p>');
                      jQuery('.pblr-card-response').show();
                  }
              } else {
                  jQuery(".pblr-card-response").addClass("error");
                  jQuery('.pblr-card-response').html('<p>Connection error occured. Please try agin after some time or do refresh page.</p>');
                  jQuery('.pblr-card-response').show();
                  jQuery('.reset-loader').hide();
              }
          },
          error: function (jqXHR, exception) {
              var msg = '';
              if (jqXHR.status === 0) {
                  msg = 'Not connect.\n Verify Network.';
              } else if (jqXHR.status == 404) {
                  msg = 'Requested page not found.';
              } else if (jqXHR.status == 500) {
                  msg = 'Internal Server Error';
              } else if (exception === 'parsererror') {
                  msg = 'Requested JSON parse failed.';
              } else if (exception === 'timeout') {
                  msg = 'Time out error.';
              } else if (exception === 'abort') {
                  msg = 'Ajax request aborted.';
              } else {
                  msg = 'Uncaught Error.\n';// + jqXHR.responseText;
              }
              jQuery(".pblr-card-response").addClass("error");
              jQuery('.reset-loader').hide();
              jQuery('.pblr-card-response').html('<p>'+msg+' Try page reload.</p>');
              jQuery('.pblr-card-response').show();
          }
      });
      jQuery('input[type="submit"]').prop('disabled', false);
      jQuery('.reset-loader').hide();
  });
});

function account_cancel_confirmation(e) { 
    var reason = jQuery("#cancelReason").val();
    jQuery('.cancel-loader').show();
    jQuery('input[type="submit"]').prop('disabled', true);
    if( jQuery.trim(reason) == "" ) {
        jQuery('.cancel-loader').hide();
        jQuery('input[type="submit"]').prop('disabled', false);
        jQuery('.pblr-cancel-response').addClass("error");
        jQuery('.pblr-cancel-response').html('<p>Please select any reason</p>');
        jQuery('.pblr-cancel-response').show();
        return false;
    }
    e.preventDefault();
    var result = confirm("Are you sure want to cancel your subscription?"); 
    if (result == true) { 
      var cancel_frm = jQuery('#cancel-form');
      jQuery.ajax({
              type: "POST",
              url:cancel_frm.attr('action'),
              data: cancel_frm.serialize(), // serializes the form's elements.
              success: function(response)
              {
                  jQuery('.cancel-loader').show();
                  if( jQuery.trim(response) != "" ) {
                      var data = JSON.parse(response);
                      jQuery('.cancel-loader').hide();
                      if(data.type == 'success' ){
                          jQuery('.pblr-cancel-response').html('<p>'+data.message+'</p>');
                          jQuery('.pblr-cancel-response').show();
                          setTimeout(function(){
                            location.reload();
                          }, 2000);
                      } else {
                          jQuery('.pblr-cancel-response').addClass("error");
                          jQuery('.pblr-cancel-response').html('<p>'+data.message+'</p>');
                          jQuery('.pblr-cancel-response').show();
                      }
                  } else {
                      jQuery('.pblr-cancel-response').addClass("error");
                      jQuery('.pblr-cancel-response').html('<p>Connection error occured. Please try agin after some time or do refresh page.</p>');
                      jQuery('.pblr-cancel-response').show();
                      jQuery('.cancel-loader').hide();
                  } 
              },
              error: function (jqXHR, exception) {
                  var msg = '';
                  if (jqXHR.status === 0) {
                      msg = 'Not connect.\n Verify Network.';
                  } else if (jqXHR.status == 404) {
                      msg = 'Requested page not found. [404]';
                  } else if (jqXHR.status == 500) {
                      msg = 'Internal Server Error [500].';
                  } else if (exception === 'parsererror') {
                      msg = 'Requested JSON parse failed.';
                  } else if (exception === 'timeout') {
                      msg = 'Time out error.';
                  } else if (exception === 'abort') {
                      msg = 'Ajax request aborted.';
                  } else {
                      msg = 'Uncaught Error.\n';// + jqXHR.responseText;
                  }
                  jQuery('.cancel-loader').hide();
                  jQuery('.pblr-cancel-response').addClass("error");
                  jQuery('.pblr-cancel-response').html('<p>'+msg+' Try page reload.</p>');
                  jQuery('.pblr-cancel-response').show();
              }
      });
      jQuery('.cancel-loader').hide();
      jQuery('input[type="submit"]').prop('disabled', false);
    } else { 
      jQuery('.cancel-loader').hide();
      jQuery('input[type="submit"]').prop('disabled', false);
        // console.log('cancel');
    } 
    jQuery('.cancel-loader').hide();
    jQuery('input[type="submit"]').prop('disabled', false);
} 

jQuery(document).ready(function() {
    // Create an instance of the Stripe object
    // Set your publishable API key
    if(jQuery("#card-element").length) {
      if( document.getElementById('publirStripePubKey') )
        var publishapikey = document.getElementById('publirStripePubKey').value;
        var stripe = Stripe(publishapikey);
        var elements = stripe.elements();
        var card = elements.create('card');
        card.mount('#card-element');
        // var cardNumberElement = elements.create('cardNumber', {
        //     placeholder: 'Card Number',
        // });
        // cardNumberElement.mount('#card-element');
        // Validate input of the card elements
        //var resultContainer = document.getElementById('paymentResponse');
        //resultContainer = document.getElementById('signup-response');
        card.addEventListener('change', function(event) {
            if (event.error) {
                //resultContainer.innerHTML = '<p>'+result.error.message+'</p>';
                jQuery(".signup-response").addClass("error");
                jQuery(".signup-response").html('<p>'+event.error.message+'</p>');
                jQuery(".signup-response").show();
                return false;
            } else {
              //jQuery(".signup-response").removeClass("error");
              //jQuery(".signup-response").hide();
                //resultContainer.innerHTML = '';
            }
        });
    }
    // Get payment form element
    var form = document.getElementById('paymentFrm');
    if(form){
        // Create a token when the form is submitted.
        form.addEventListener('submit', function(e) {
            jQuery('input[type="submit"]').prop('disabled', true);
            e.preventDefault();
            if ( validateForm() ) {
                var plan = '';
                var plan = document.querySelector('input[name="plan"]:checked').value;
                if( plan != "Free" ) {
                    createToken();
                }
                else {
                    registerFree();
                }
                return false;
            }
            jQuery('input[type="submit"]').prop('disabled', false); 
        });
    }
    // Create single-use token to charge the user
    function createToken() {
      //resultContainer = document.getElementById('signup-response');
        stripe.createToken(card).then(function(result) {
            if (result.error) {
                // Inform the user if there was an error
                //resultContainer.innerHTML = '<p>'+result.error.message+'</p>';
                jQuery(".signup-response").html('<p>'+result.error.message+'</p>');
                jQuery(".signup-response").addClass("error");
                jQuery(".signup-response").show();
                return false;
            } else {
              //jQuery(".signup-response").removeClass("error");
                //jQuery(".signup-response").hide();
                // Send the token to your server
                stripeTokenHandler(result.token);
            }
        });
    }
    // Callback to handle the response from stripe
    function stripeTokenHandler(token) {
        // Insert the token ID into the form so it gets submitted to the server
        jQuery('input[name="stripeToken"]').val(token.id);
        jQuery('input[name="stripeLast4"]').val(token.card.last4);
        jQuery('input[name="stripeBrand"]').val(token.card.brand);
        var payform = jQuery('#paymentFrm');
        jQuery('.signup-loader').show();
        jQuery.ajax({
            type: "POST",
            url:pblir_ajax.ajax_url,
            data: payform.serialize(), // serializes the form's elements.
            success: function(response) {
                if( jQuery.trim(response) != "" ) {
                    var data1 = JSON.parse(response);
                    jQuery('.signup-loader').hide();
                    if(data1.type == 'success' ){
                        jQuery('.signup-response').html('<p>'+data1.message+'</p>');
                        jQuery('.signup-response').show();
                        setTimeout(function(){
                          location.reload();
                        }, 1500);
                    } else {
                        jQuery('.signup-response').addClass('error');
                        jQuery('.signup-response').html('<p>'+data1.message+'</p>');
                        jQuery('.signup-response').show();
                    }
                } else {
                    jQuery('.signup-response').addClass('error');
                    jQuery('.signup-response').html('<p>Connection error occured. Please try agin after some time or do refresh page.</p>');
                    jQuery('.signup-response').show();
                    jQuery('.signup-loader').hide();
                }
            }, 
            error: function (jqXHR, exception) {
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connect.\n Verify Network.';
                } else if (jqXHR.status == 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n';// + jqXHR.responseText;
                }
                jQuery('.signup-response').hide();
                jQuery('.signup-response').addClass('error');
                jQuery('.signup-response').html('<p>'+msg+' Try page reload.</p>');
                jQuery('.signup-response').show();
            }
        });
        jQuery('.signup-loader').hide();
        jQuery('input[type="submit"]').prop('disabled', false);
    }

    function registerFree() {
        var payform = jQuery('#paymentFrm');
        // if( !jQuery("input[name='plan']:checked").val() ) {
        //     jQuery('.signup-response').html('<p> Please choose a subscription plan</p>');
        //     jQuery('.signup-response').addClass('error');
        //     jQuery('.signup-response').show();
        //     return false;
        // } else {
        //     jQuery('.signup-response').html('<p></p>');
        //     jQuery('.signup-response').removeClass('error');
        //     jQuery('.signup-response').hide();
        // }
        // if(!jQuery("#name").val()){
        //     jQuery("#name").addClass('error');
        //     jQuery('.signup-response').html('<p>Please enter name!</p>');
        //     jQuery('.signup-response').addClass('error');
        //     jQuery('.signup-response').show();
        //     return false;
        // }else{
        //     if(validateEmail(jQuery("#name").val())) {
        //         jQuery("#name").addClass('error');
        //         jQuery('.signup-response').addClass('error');
        //         jQuery('.signup-response').html('<p>Please enter valid name!</p>');
        //         jQuery('.signup-response').show();
        //         return false;
        //     }
        //     jQuery("#name").removeClass('error');
        //     jQuery('.signup-response').html('<p></p>');
        //     jQuery('.signup-response').removeClass('error');
        //     jQuery('.signup-response').hide();
        // }
        // if(!jQuery("#email").val()){
        //     jQuery("#email").addClass('error');
        //     jQuery('.signup-response').addClass('error');
        //     jQuery('.signup-response').html('<p>Please enter email!</p>');
        //     jQuery('.signup-response').show();
        //     return false;
        // }else{
        //     jQuery("#email").removeClass('error');
        //     jQuery('.signup-response').html('<p></p>');
        //     jQuery('.signup-response').removeClass('error');
        //     jQuery('.signup-response').hide();
        // }
        jQuery('.signup-loader').show();
        jQuery('input[type="submit"]').prop('disabled', true);
        jQuery.ajax({
            type: "POST",
            url:pblir_ajax.ajax_url,
            data: payform.serialize(), // serializes the form's elements.
            success: function(response) {
                if( jQuery.trim(response) != "" ) {
                    var data1 = JSON.parse(response);
                    jQuery('.signup-loader').hide();
                    if(data1.type == 'success' ){
                        jQuery('.signup-response').html('<p>'+data1.message+'</p>');
                        jQuery('.signup-response').show();
                        setTimeout(function(){
                          location.reload();
                        }, 1500);
                    } else {
                        jQuery('.signup-response').addClass('error');
                        jQuery('.signup-response').html('<p>'+data1.message+'</p>');
                        jQuery('.signup-response').show();
                    }
                } else {
                    jQuery('.signup-response').addClass('error');
                    jQuery('.signup-response').html('<p>Connection error occured. Please try agin after some time or do refresh page.</p>');
                    jQuery('.signup-response').show();
                    jQuery('.signup-loader').hide();
                }
            }, 
            error: function (jqXHR, exception) {
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connect.\n Verify Network.';
                } else if (jqXHR.status == 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n';// + jqXHR.responseText;
                }
                jQuery('.signup-response').hide();
                jQuery('.signup-response').addClass('error');
                jQuery('.signup-response').html('<p>'+msg+' Try page reload.</p>');
                jQuery('.signup-response').show();
            }
        });
        jQuery('input[type="submit"]').prop('disabled', false);
    }
    jQuery('.signup').click(function(e){
        jQuery("#tab2").trigger('click');
    });
    jQuery('.request-passowrd').click(function(e){
        jQuery("#tab3").trigger('click');
    });
    if(jQuery("#card-element").length){
        // Get payment form element
        var form = document.getElementById('updateCardFrm');
        // Create a token when the form is submitted.
        if(form){
            form.addEventListener('submit', function(e) {
                jQuery('.card-loader').show();
                jQuery('input[type="submit"]').prop('disabled', true);
                e.preventDefault();
                createCardToken();
            });
        } 
    }
    // Create single-use token to charge the user
    function createCardToken() {
        stripe.createToken(card).then(function(result) {
            if (result.error) {
                // Inform the user if there was an error
                jQuery(".pblr-card-response").html('<p>'+result.error.message+'</p>');
                jQuery(".pblr-card-response").addClass("error");
                jQuery(".pblr-card-response").show();
                jQuery('.card-loader').hide();
                jQuery('input[type="submit"]').prop('disabled', false);
                //resultContainer.innerHTML = '<p>'+result.error.message+'</p>';
            } else {
                jQuery(".pblr-card-response").hide();
                // Send the token to your server
                stripeCardTokenHandler(result.token);
            }
        });
    }
    // Callback to handle the response from stripe
    function stripeCardTokenHandler(token) {
        if( token.id == "" || token.card.last4 == "" || token.card.brand == "" ) {
            jQuery('.pblr-card-response').addClass("error");
            jQuery('.pblr-card-response').html('<p>Something went wrong. Please try again.</p>');
            jQuery('.pblr-card-response').show();
            jQuery('.card-loader').hide();
            jQuery('input[type="submit"]').prop('disabled', false);
            return false;
        }
        // Insert the token ID into the form so it gets submitted to the server
        jQuery('input[name="stripeToken"]').val(token.id);
        jQuery('input[name="stripeLast4"]').val(token.card.last4);
        jQuery('input[name="stripeBrand"]').val(token.card.brand);
        var payform = jQuery('#updateCardFrm');
        jQuery.ajax({
            type: "POST",
            url:pblir_ajax.ajax_url,
            data: payform.serialize(), // serializes the form's elements.
            success: function(response) {
                if( jQuery.trim(response) != "" ) {
                    var data1 = JSON.parse(response);
                    jQuery('.card-loader').hide();
                    if(data1.type == 'success' ){
                        jQuery('.pblr-card-response').html('<p>'+data1.message+'</p>');
                        jQuery('.pblr-card-response').show();
                        setTimeout(function(){
                          location.reload();
                        }, 1500);
                    } else {
                        jQuery('.pblr-card-response').addClass('error');
                        jQuery('.pblr-card-response').html('<p>'+data1.message+'</p>');
                        jQuery('.pblr-card-response').show();
                    }
                } else {
                    jQuery('.pblr-card-response').addClass('error');
                    jQuery('.pblr-card-response').html('<p>Connection error occured. Please try agin after some time or do refresh page.</p>');
                    jQuery('.pblr-card-response').show();
                    jQuery('.card-loader').hide();
                }
            }, 
            error: function (jqXHR, exception) {
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connect.\n Verify Network.';
                } else if (jqXHR.status == 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n';// + jqXHR.responseText;
                }
                jQuery('.card-loader').hide();
                jQuery('.pblr-card-response').addClass('error');
                jQuery('.pblr-card-response').html('<p>'+msg+' Try page reload.</p>');
                jQuery('.pblr-card-response').show();
            }
        });
        jQuery('.card-loader').hide();
        jQuery('input[type="submit"]').prop('disabled', false);
    }  
});

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function plan_change(thisVal) {
    var plan = jQuery(thisVal).val();
    jQuery(".signup-response").hide();
    jQuery(".signup-response").html("");
    if( plan == "Free" ) {
        jQuery("#up_pass_show").hide();
        jQuery("#cup_pass_show").hide();
        jQuery("#pubsubcardblock").hide();
        //jQuery("#pubsubcardblock").html("");
        jQuery("#paymentNote").hide();
        jQuery("#payBtn").val("Submit");
    } else {
        jQuery("#up_pass_show").show();
        jQuery("#cup_pass_show").show();
        jQuery("#pubsubcardblock").show();
        var htm = '<label for="card-element">Enter Credit or Debit Card</label><div id="card-element" class="form-control"></div>';
        //jQuery("#pubsubcardblock").html(htm);
        jQuery("#paymentNote").show();
        jQuery("#payBtn").val("Submit Payment");
    }
}

jQuery(".close").on("click", function() {
    jQuery(".alert").hide();
});

function validateForm() {
    if( ! jQuery('input[name="plan"]:checked').val() ) {
        jQuery('.signup-response').html('<p>Please choose a subscription plan</p>');
        jQuery('.signup-response').addClass('error');
        jQuery('.signup-response').show();
        return false;
    } else {
        jQuery('.signup-response').html('<p></p>');
        jQuery('.signup-response').removeClass('error');
        jQuery('.signup-response').hide();
    }
    var plan = jQuery('input[name="plan"]:checked').val();
    if( plan === "Free" ) {
        if(!jQuery("#name").val()){
            jQuery("#name").addClass('error');
            jQuery('.signup-response').html('<p>Please enter name!</p>');
            jQuery('.signup-response').addClass('error');
            jQuery('.signup-response').show();
            return false;
        }else{
            if(validateEmail(jQuery("#name").val())) {
                jQuery("#name").addClass('error');
                jQuery('.signup-response').addClass('error');
                jQuery('.signup-response').html('<p>Please enter valid name!</p>');
                jQuery('.signup-response').show();
                return false;
            }
            var name = jQuery("#name").val();
            var regName = /^[a-zA-Z] +$/;
            //if(!regName.test(name)){
            //  jQuery("#name").addClass("error");
            //    jQuery('.signup-response').html('<p>Please enter valid name!</p>');
             //   jQuery('.signup-response').addClass('error');
            //    jQuery('.signup-response').show();
            //    return false;
            //}
            jQuery("#name").removeClass('error');
            jQuery('.signup-response').html('<p></p>');
            jQuery('.signup-response').removeClass('error');
            jQuery('.signup-response').hide();
        }

        if(!jQuery("#email").val()){
            jQuery("#email").addClass('error');
            jQuery('.signup-response').addClass('error');
            jQuery('.signup-response').html('<p>Please enter email!</p>');
            jQuery('.signup-response').show();
            return false;
        }else{
            if( !validateEmail( jQuery("#email").val() ) ) {
                jQuery("#email").addClass('error');
                jQuery('.signup-response').addClass('error');
                jQuery('.signup-response').html('<p>Please enter valid email!</p>');
                jQuery('.signup-response').show();
                return false;
            }
            jQuery("#email").removeClass('error');
            jQuery('.signup-response').html('<p></p>');
            jQuery('.signup-response').removeClass('error');
            jQuery('.signup-response').hide();
        }
    } else {
        if(!jQuery("#name").val()){
            jQuery("#name").addClass('error');
            jQuery('.signup-response').html('<p>Please enter name!</p>');
            jQuery('.signup-response').addClass('error');
            jQuery('.signup-response').show();
            return false;
        }else{
            if(validateEmail(jQuery("#name").val())) {
                jQuery("#name").addClass('error');
                jQuery('.signup-response').addClass('error');
                jQuery('.signup-response').html('<p>Please enter valid name!</p>');
                jQuery('.signup-response').show();
                return false;
            }
            var name = jQuery("#name").val();
            var regName = /^[a-zA-Z]+ $/;
            //if(!regName.test(name)){
            //  jQuery("#name").addClass("error");
            //    jQuery('.signup-response').html('<p>Please enter a valid name!</p>');
            //    jQuery('.signup-response').addClass('error');
            //    jQuery('.signup-response').show();
            //    return false;
            //}
            jQuery("#name").removeClass('error');
            jQuery('.signup-response').html('<p></p>');
            jQuery('.signup-response').removeClass('error');
            jQuery('.signup-response').hide();
        }
        if(!jQuery("#email").val()){
            jQuery("#email").addClass('error');
            jQuery('.signup-response').addClass('error');
            jQuery('.signup-response').html('<p>Please enter email!</p>');
            jQuery('.signup-response').show();
            return false;
        }else{
            if( !validateEmail( jQuery("#email").val() ) ) {
                jQuery("#email").addClass('error');
                jQuery('.signup-response').addClass('error');
                jQuery('.signup-response').html('<p>Please enter valid email!</p>');
                jQuery('.signup-response').show();
                return false;
            }
            jQuery("#email").removeClass('error');
            jQuery('.signup-response').html('<p></p>');
            jQuery('.signup-response').removeClass('error');
            jQuery('.signup-response').hide();
        }
        if(!jQuery("#password").val()){
            jQuery("#password").addClass('error');
            jQuery('.signup-response').addClass('error');
            jQuery('.signup-response').html("<p>Password field can't empty!</p>");
            jQuery('.signup-response').show();
            return false;
        }else{
            jQuery("#password").removeClass('error');
            jQuery('.signup-response').html('<p></p>');
            jQuery('.signup-response').removeClass('error');
            jQuery('.signup-response').hide();
        }
        if(!jQuery("#confirm-password").val()){
            jQuery("#confirm-password").addClass('error');
            jQuery('.signup-response').addClass('error');
            jQuery('.signup-response').html('<p>Please enter confirm password!</p>');
            jQuery('.signup-response').show();
            return false;
        }else{
            jQuery("#confirm-password").removeClass('error');
            jQuery('.signup-response').html('<p></p>');
            jQuery('.signup-response').removeClass('error');
            jQuery('.signup-response').hide();
        }
        if( jQuery("#confirm-password").val() != jQuery("#password").val() ) {
            jQuery("#confirm-password").addClass('error');
            jQuery("#password").addClass('error');
            jQuery('.signup-response').addClass('error');
            jQuery('.signup-response').html('<p>Password and Confirm password not match</p>');
            jQuery('.signup-response').show();
            return false;
        }
    }
    return true;
}
$(document).ready(function() {

$( "#login_btn" ).click(function() {
    
$( "#view_start" ).fadeOut( "slow", function() {
  $( "#view_login" ).fadeIn( "slow", function() {

  });
});
});
    
$( "#login_admin_btn" ).click(function() {
var login_admin = prompt('Please enter your login credentials:');
if(login_admin =='250taxiadmin')
{
	window.open('http://250taxi.com/admin/', '_system'); 
}
else
{
	alert('Unknown account. Please try again.');
}
});

$(document).on('submit','#login_form',function (e) {
    //prevent the form from doing a submit
    e.preventDefault();
    return false;
})
    
$('#login_btn_go').click(function(e){
  //Leverage the HTML5 validation w/ ajax. Have to submit to get em. Wont actually submit cuz form
  //has .validateDontSubmit class
  var $theForm = $(this).closest('form');
  //Some browsers don't implement checkValidity
  if (( typeof($theForm[0].checkValidity) == "function" ) && !$theForm[0].checkValidity()) {
    alert('Account not found. Please check your login or contact support.');
     return;
  }

  login_form_go();
});
    
});

function login_form_go() {

    partner_type = document.getElementById('partner_type').value;
    id_no = document.getElementById('id_no').value;
    pin = document.getElementById('pin').value;
    
    check_login();
}



function scancode() {
    
cordova.plugins.barcodeScanner.scan(
      function (result) {
        // alert("We got a barcode\n" +
        //   "Result: " + result.text + "\n" +
        //   "Format: " + result.format + "\n" +
        //   "Cancelled: " + result.cancelled);
          
          is_cancelled = result.cancelled;
          
        //  alert(is_cancelled);
          
          if (is_cancelled == true) {
              alert("Scanning cancelled. Please try again.")
          }
          else if (is_cancelled == false) {
          
          localStorage.setItem("codefromqr", result.text);
          
          namefound();
        }
          
      }, 
      function (error) {
          alert("Scanning failed: " + error);
      }
   );

}
  
function namefound() {

var codefromqr = localStorage.getItem("codefromqr");
var codefromqr = atob(codefromqr);
var codefromqr_type = codefromqr.substr (0, 3);
var codefromqr_id = codefromqr.substr (3);
    
// alert("Type: "+codefromqr_type+"\nID: "+codefromqr_id+"");

}

function check_login() {

if (partner_type == "TX_") { 
$.get( "http://250taxi.com/db/partner/taxi_id_get_name.php?id="+id_no+"", function( data ) {
    
var login_from_qr_pin = prompt('Hi, '.data.'.\nPlease enter your PIN:');
    
});
}
else {
    alert('Coming soon...')
}
}
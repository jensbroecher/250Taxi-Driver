$(document).ready(function() {

$( "#login_btn" ).click(function() {
    
$( "#view_start" ).fadeOut( "slow", function() {
  $( "#view_login" ).fadeIn( "slow", function() {

  });
});
});
    
$( "#login_btn_register" ).click(function() {
    alert('Please register on our mobile website.');
	window.open('http://250taxi.com', '_system'); 
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
    alert('Account not found. Please check your ID Number and PIN or contact support.');
     return;
  }

  login_form_go();
});
    
});

function login_form_go() {
    
partner_type = document.getElementById('partner_type').value;
id_no = document.getElementById('id_no').value;
pin = document.getElementById('pin').value;
    
if (partner_type == "TX_") {
    
$.get( "http://250taxi.com/db/partner/taxi_id_check_if_exists.php?id_no="+id_no+"", function( data ) {
    
if (data == "account_found") { 
    check_login();
}
if (data == "account_not_found") { 
    alert('Account not found. Please try again.');
}

});
}
else {
    alert('Account type not supported yet.');
}
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
    
alert("Type: "+codefromqr_type+"\nID: "+codefromqr_id+"");
    
// partner_type = codefromqr_type;
// id_no = codefromqr_id;
// pin = "";

// check_login();

}

function check_login() {

if (partner_type == "TX_") {
    
// alert(id_no);

$.get( "http://250taxi.com/db/partner/taxi_id_get_name.php?id_no="+id_no+"", function( data ) {
    
var login_from_qr_pin = prompt("Hi, "+data+".\nPlease enter your PIN:",""+pin+"");
    
if (login_from_qr_pin === "") {
    alert('Please enter your PIN!');
    check_login();
} else if (login_from_qr_pin) {
    $.get( "http://250taxi.com/db/partner/taxi_id_check_pin.php?pin="+pin+"", function( data ) {
        alert(data);
    });
} else {
    return;
}


});
}
else {
    alert('Account type not supported yet.');
}
    
}
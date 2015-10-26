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
    var partner_type = document.getElementById('partner_type').value;
    var id_no = document.getElementById('id_no').value;
    var pin = document.getElementById('pin').value;
    alert(""+partner_type+" "+id_no+" "+pin+"");
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
          
          document.getElementById("aniwrap").style.display = "block";
          document.getElementById("scancodebutton").style.display = "none";
          
          localStorage.setItem("person", result.text);
          
          namefound();
        }
          
      }, 
      function (error) {
          alert("Scanning failed: " + error);
      }
   );

}
    
function namefound() {
person = localStorage.getItem("person");
alert("Welcome "+person+"");
}

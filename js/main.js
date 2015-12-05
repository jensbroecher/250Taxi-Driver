function back_to_start() {
$( "#view_login" ).fadeOut( "slow", function() {
  $( "#view_start" ).fadeIn( "slow", function() {

  });
});
}

$(document).ready(function() {
    
var loggedin = localStorage.getItem('loggedin');
    
if (loggedin == 'Yes') {
    var driver_name = localStorage.getItem("driver_name");
    document.getElementById("driver_name").innerHTML = driver_name;
    wasloggedin();
}

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
    
$( "#login_btn_corporate" ).click(function() {
    corporate_login();
});

$(document).on('submit','#login_form',function (e) {
    //prevent the form from doing a submit
    e.preventDefault();
    return false;
})
    
$('#login_btn_go').click(function(e){
  //Leverage the HTML5 validation w/ ajax. Have to submit to get em. Wont actually submit
  //has .validateDontSubmit class
  var $theForm = $(this).closest('form');
  //Some browsers don't implement checkValidity
  if (( typeof($theForm[0].checkValidity) == "function" ) && !$theForm[0].checkValidity()) {
    localStorage.setItem('toast','Account not found. Please check your ID Number / Username.');toast();
     return;
  }
  login_form_go();
});
    
});

function login_form_go() {
    
partner_type = document.getElementById('partner_type').value;
id_no = document.getElementById('id_no').value;
// pin = document.getElementById('pin').value;
    
if (partner_type == "TX_") {
    
$.get( "http://250taxi.com/db/partner/taxi_id_check_if_exists.php?id_no="+id_no+"", function( data ) {
    
if (data == "account_found") { 
    check_login();
}
if (data == "account_not_found") {
    localStorage.setItem('toast','Account not found. Please try again.');toast();
}

});
}
else {
    localStorage.setItem('toast','Account type not supported yet.');toast();
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
              
            //  alert("Test");
          
              localStorage.setItem("codefromqr", result.text);
              
            // alert(result.text);
    
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
    
partner_type = codefromqr_type;
id_no = codefromqr_id;
pin = "";

check_login_from_card();

}

function check_login_from_card() {
    
if (partner_type == "TX_") {
    
   localStorage.setItem("id_no", id_no);
    
    $.get( "http://250taxi.com/db/partner/taxi_id_get_name.php?id_no="+id_no+"", function( data ) {
        
localStorage.setItem("driver_name", data);

    localStorage.setItem('loggedin','Yes');
            
    var driver_name = localStorage.getItem("driver_name");
    document.getElementById("driver_name").innerHTML = driver_name;
            
            $( "#view_login" ).fadeOut( "slow", function() {
                $( "#view_taxi_waiting" ).fadeIn( "slow", function() {
                    myVar = setInterval(function(){ myTimer() }, 10000);
                    localStorage.setItem('toast','Login successful!');toast();
                    responsiveVoice.speak("Welcome to twofiftytaxi!", "UK English Male");
                });
            });
        
     });
        
}
else {
    alert('Account type not supported yet.');
}
    
}

function check_login() {

if (partner_type == "TX_") {

// alert(id_no);

localStorage.setItem("id_no", id_no);

$.get( "http://250taxi.com/db/partner/taxi_id_get_name.php?id_no="+id_no+"", function( data ) {
    
localStorage.setItem("driver_name", data);

responsiveVoice.speak("Please enter your PIN!", "UK English Male");
    
            setTimeout(function(){ 
                check_login_prompt();
            }, 3000);
    
function check_login_prompt() {

// var pin_length = pin.length;

var login_from_qr_pin = prompt("Amakuru, "+data+".\nPlease enter your PIN:","");
pin = login_from_qr_pin;
    
if (login_from_qr_pin === "") {
    alert('Please enter your PIN!');
    check_login();
} else if (login_from_qr_pin) {
    
    // alert(pin);
    
    $.get( "http://250taxi.com/db/partner/taxi_id_check_pin.php?id_no="+id_no+"&pin="+pin+"", function( data ) {
        
        // alert(data);
        
        if (data == "pin_correct") {
            
            responsiveVoice.speak("PIN Correct! Welcome to twofiftytaxi!", "UK English Male");
            
            localStorage.setItem('toast','Login successful!');toast();

            localStorage.setItem('loggedin','Yes');
            
            var driver_name = localStorage.getItem("driver_name");
            document.getElementById("driver_name").innerHTML = driver_name;
            
            $( "#view_login" ).fadeOut( "slow", function() {
                $( "#view_taxi_waiting" ).fadeIn( "slow", function() {
                    myVar = setInterval(function(){ myTimer() }, 10000);
                });
            });
            
        }
        if (data == "pin_false") {
            
            responsiveVoice.speak("Sorry,  PIN incorrect.", "UK English Male");
            
            setTimeout(function(){ 
                pin_incorrect_info(); 
            }, 3000);
            
            function pin_incorrect_info() {
            alert("PIN incorrect.");
            check_login();
            }
        }
    });
} else {
    return;
}
} 
});
}
else {
    alert('Account type not supported yet.');
}
   
}

function wasloggedin() {
    document.getElementById('view_start').style.display = 'none';
    document.getElementById('view_taxi_waiting').style.display = 'block';
    myVar = setInterval(function(){ myTimer() }, 10000);
}
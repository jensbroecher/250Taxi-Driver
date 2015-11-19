function corporate_login() {
    $('#corporate_login_start').fadeIn('slow');
}
function corporate_login_start() {
    var corporate_login_type = localStorage.getItem('corporate_login_type');
    
    if (corporate_login_type == 'hotel') {
        hotel_login_start();
    }
    if (corporate_login_type == 'corporate') {
        alert('Coming soon...');
    }
}
function hotel_login_start() {

var hotel_login_name = prompt("Hotel Name", "");

if (hotel_login_name != null) {
    localStorage.setItem("hotel_login_name", hotel_login_name);
    $.get( "http://250taxi.com/db/partner/hotel/hotel_check_name.php?hotel_name="+hotel_login_name+"", function( data ) {
        
        if(data == "1") {
            hotel_login_pin();
        }
        if(data == "0") {
            alert("Hotel not found. Please try again.");
            hotel_login_start();
        }
        
    });
}

}
function hotel_login_pin() {

var hotel_pin = prompt("PIN", "");
var hotel_login_name = localStorage.getItem("hotel_login_name");

if (hotel_pin != null) {
    $.get( "http://250taxi.com/db/partner/hotel/hotel_check_pin.php?hotel_name="+hotel_login_name+"&hotel_pin="+hotel_pin+"", function( data ) {
        
        if(data == "1") {
            hotel_card_menu();
        }
        if(data == "0") {
            alert("PIN incorrect. Please try again.");
            hotel_login_pin();
        }
        
    });
}

}
function hotel_card_menu() {
    
    var hotel_login_name = localStorage.getItem("hotel_login_name");
    $.get( "http://250taxi.com/db/partner/hotel/hotel_check_id.php?hotel_name="+hotel_login_name+"", function( data ) {
        
    if(data == "error") {
            alert("An error occured. Please try again.");
            location.reload();
    }
    else {
        localStorage.setItem("hotel_id", data);
    }
    
    document.getElementById("corporate_login_start").style.display = "none";
    document.getElementById("hotel_card_menu").style.display = "block";
        
    });
}
function hotel_card_menu_scancode_activate() {   
cordova.plugins.barcodeScanner.scan(
      function (result) {
          is_cancelled = result.cancelled;
          if (is_cancelled == true) {
              alert("Scanning cancelled. Please try again.")
          }
          else if (is_cancelled == false) {
            localStorage.setItem("codefromqr_hotel", result.text);
            hotel_card_activate();
        } 
      }, 
      function (error) {
          alert("Scanning failed: " + error);
      }
   );
}
function hotel_card_menu_scancode_deactivate() {   
cordova.plugins.barcodeScanner.scan(
      function (result) {
          is_cancelled = result.cancelled;
          if (is_cancelled == true) {
              alert("Scanning cancelled. Please try again.")
          }
          else if (is_cancelled == false) {
            localStorage.setItem("codefromqr_hotel", result.text);
            hotel_card_deactivate();
        } 
      }, 
      function (error) {
          alert("Scanning failed: " + error);
      }
   );
}
function rot13(str) {
  return str.replace(/[a-zA-Z]/g, function(chr) {
    var start = chr <= 'Z' ? 65 : 97;
    return String.fromCharCode(start + (chr.charCodeAt(0) - start + 13) % 26);
  });
}
function hotel_card_activate_test() {
    localStorage.setItem("codefromqr_hotel_decode","1");
    hotel_card_activate();
}
function hotel_card_activate() {
    
    var codefromqr_hotel = localStorage.getItem("codefromqr_hotel");   
    var codefromqr_hotel = window.atob(codefromqr_hotel);
    var codefromqr_hotel = rot13(codefromqr_hotel);
    var codefromqr_hotel = codefromqr_hotel.substring(5);
    localStorage.setItem("codefromqr_hotel_decode",codefromqr_hotel);
    
    document.getElementById("hotel_card_activation_guest_check_in_date").valueAsDate = new Date();
    document.getElementById("hotel_card_activation_guest_check_out_date").valueAsDate = new Date();

    document.getElementById("hotel_card_menu").style.display = "none";
    document.getElementById("hotel_card_activation_form").style.display = "block";
}
function hotel_card_activation_complete() { 
    
var hotel_card_activation_guest_name = document.getElementById("hotel_card_activation_guest_name").value;
var hotel_card_activation_guest_email = document.getElementById("hotel_card_activation_guest_email").value;
var hotel_card_activation_guest_room_number = document.getElementById("hotel_card_activation_guest_room_number").value;
var hotel_card_activation_guest_phone_number = document.getElementById("hotel_card_activation_guest_phone_number").value;
var hotel_card_activation_guest_check_in_date = document.getElementById("hotel_card_activation_guest_check_in_date").value;
var hotel_card_activation_guest_check_out_date = document.getElementById("hotel_card_activation_guest_check_out_date").value;
var hotel_card_activation_pin = document.getElementById("hotel_card_activation_pin").value;

$.get( "http://250taxi.com/db/partner/hotel/activate_card.php?hotel_card_activation_guest_name="+hotel_card_activation_guest_name+"&hotel_card_activation_guest_email="+hotel_card_activation_guest_email+"&hotel_card_activation_guest_room_number="+hotel_card_activation_guest_room_number+"&hotel_card_activation_guest_phone_number="+hotel_card_activation_guest_phone_number+"&hotel_card_activation_guest_check_in_date="+hotel_card_activation_guest_check_in_date+"&hotel_card_activation_guest_check_out_date="+hotel_card_activation_guest_check_out_date+"&hotel_card_activation_pin="+hotel_card_activation_pin+"", function( data ) {
    alert("Card Activated");
});
    
}
function hotel_card_deactivate() {
    
    var codefromqr_hotel = localStorage.getItem("codefromqr_hotel");   
    var codefromqr_hotel = window.atob(codefromqr_hotel);
    var codefromqr_hotel = rot13(codefromqr_hotel);
    var codefromqr_hotel = codefromqr_hotel.substring(5);
    localStorage.setItem("codefromqr_hotel_decode",codefromqr_hotel);
}














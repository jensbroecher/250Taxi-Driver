function start_fare_counter() {
    
show_fare_count();
    
fare_counter_map_start();
    
clearInterval(chat_updater);
    
console.log("Start Fare Counter");
    
document.getElementById("journey_fare_display_destination_target").innerHTML = document.getElementById("passenger_destination").innerHTML;
    
// Start Stopwatch
stopwatchtimer();

// Get journey ID

var driverid = localStorage.getItem("driverid");
var clientid = localStorage.getItem("clientid");

    $.get("http://250taxi.com/db/journey/get_journey_id.php?driverid=" + driverid + "", function (journeyid) {
        console.log("Journey ID: " + journeyid);
        
        document.getElementById("corner_journey_id").innerHTML = journeyid;
        
        if (journeyid == "0") {
            console.log("Journey id nicht gefunden. Driver hat journey gestartet");
            
            // Passenger has boarded dialog nicht einblenden (Ist jetzt toast)
            localStorage.setItem("passenger_has_boarded_dialog_confirmed", "Yes");
            
            console.log("Journey ID: " + journeyid);
            
$.get( "http://250taxi.com/db/journey/journey_mode.php?task=taxi_boarded&passenger_id="+clientid+"&pickdriver_id="+driverid+"",  function( journeyid ) {
    
            document.getElementById("corner_journey_id").innerHTML = journeyid;
    
            localStorage.setItem("journeyid", journeyid);
            waypoint_recorder = setInterval(record_waypoints, 20000);
            record_waypoints();
            show_fare_count();
            $.get("http://250taxi.com/db/journey/journey_mode.php?task=start_waypoint_recording&passenger_id=" + clientid + "", function ( data) {
            });
    
}); 
        }
        else {
            console.log("Journey id gefunden. Client hat journey id erzeugt");
            
            localStorage.setItem("journeyid", journeyid);
            waypoint_recorder = setInterval(record_waypoints, 20000);
            record_waypoints();
            show_fare_count();
            $.get("http://250taxi.com/db/journey/journey_mode.php?task=start_waypoint_recording&passenger_id=" + clientid + "", function ( data) {
            });
            
        }

        
        
       

    });
}

function record_waypoints() {

    var driverid = localStorage.getItem("driverid");
    var journeyid = localStorage.getItem("journeyid");

    $.get("http://250taxi.com/db/journey/record_waypoints.php?driverid=" + driverid + "&journeyid=" + journeyid + "&lat=" + latitude + "&long=" + longitude + "", function (journey_id_response) {
        journey_fare_load();
    });

}

function show_fare_count() {
    document.getElementById("view_taxi_journeyaccepted").style.display = "none"
    document.getElementById("passenger_has_boarded_dialog").style.display = "none"
    document.getElementById("journey_fare_display").style.display = "block"
}

function journey_fare_load() {
    
    document.getElementById("passenger_on_map").style.display = "none"
    
    console.log("Fare Display Update");

    var journey_id = localStorage.getItem("journeyid");
    var journey_id = "journey_" + journey_id + "";
    var journey_id = window.btoa(journey_id);

    $("#journey_fare_load").load("http://250taxi.com/db/journey/get_total_distance.php?journey_id=" + journey_id + "", function (data) {

        document.getElementById("journey_fare_display_km_count").innerHTML = localStorage.getItem("journey_total_distance");

        document.getElementById("journey_fare_display_fare_count").innerHTML = localStorage.getItem("journey_total_cost");

    });

}


function end_journey() {

    console.log("End Journey");
    var stopwatchtime = document.getElementById("stopwatch").innerHTML;
    console.log("stopwatchtime: "+stopwatchtime+"");
    var kmdriven = document.getElementById("journey_fare_display_km_count").innerHTML;
    console.log("kmdriven: "+kmdriven+"");
    var fare = document.getElementById("journey_fare_display_fare_count").innerHTML;
    console.log("fare: "+fare+"");

    document.getElementById("journey_fare_display").style.display = "none";

    clearInterval(waypoint_recorder);
    clearTimeout(twatch);
    
    var driverid = localStorage.getItem("driverid");
    var clientid = localStorage.getItem("clientid");
    var journeyid = localStorage.getItem("journeyid");
    
    $.get( "http://250taxi.com/db/journey/journey_mode.php?task=journey_end&passenger_id="+clientid+"&pickdriver_id="+driverid+"&stopwatchtime="+stopwatchtime+"&journeyid="+journeyid+"&kmdriven="+kmdriven+"&fare="+fare+"",  function( journeyid ) {

document.getElementById("view_end").style.display = "block";
$( "#view_end" ).load( "http://250taxi.com/appcontent/driver/pay.php", function() {
    pay_screen_start();
});
        
    });

}
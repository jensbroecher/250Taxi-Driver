function start_fare_counter() {
    
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

        localStorage.setItem("journeyid", journeyid);

        waypoint_recorder = setInterval(record_waypoints, 20000);
        
        record_waypoints();
        show_fare_count();
        
        $.get("http://250taxi.com/db/journey/journey_mode.php?task=start_waypoint_recording&passenger_id=" + clientid + "", function ( data) {
        });

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
    
    console.log("Fare Display Update");

    var journey_id = localStorage.getItem("journeyid");
    var journey_id = "journey_" + journey_id + "";
    var journey_id = window.btoa(journey_id);

    $("#journey_fare_load").load("http://250taxi.com/db/journey/get_total_distance.php?journey_id=" + journey_id + "", function (data) {

        document.getElementById("journey_fare_display_km_count").innerHTML = localStorage.getItem("journey_total_distance");

        document.getElementById("journey_fare_display_fare_count").innerHTML = localStorage.getItem("journey_total_cost");

    });

}

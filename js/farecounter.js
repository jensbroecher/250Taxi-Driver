function start_fare_counter() {
    console.log("Start Fare Counter");
    
    // Get journey ID
    
    var driverid = localStorage.getItem("driverid");
    
    $.get( "http://250taxi.com/db/journey/get_journey_id.php?driverid="+driverid+"", function( journeyid ) {
        console.log("Journey ID: " + journeyid);
    
        localStorage.setItem("journeyid",journeyid);
        
        waypoint_recorder = setInterval(record_waypoints, 20000);
        
    });
}
function record_waypoints() {
    
var driverid = localStorage.getItem("driverid");
var journeyid = localStorage.getItem("journeyid");

$.get( "http://250taxi.com/db/journey/record_waypoints.php?driverid="+driverid+"&journeyid="+journeyid+"&lat="+latitude+"&long="+longitude+"", function( journey_id_response ) {

});

}
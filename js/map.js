function refresh_map() {
    
console.log("refresh_map");
    
passenger_gps_lat = document.getElementById("passenger_gps_lat").innerHTML;
passenger_gps_long = document.getElementById("passenger_gps_long").innerHTML;

$('<img src="https://maps.googleapis.com/maps/api/staticmap?center='+passenger_gps_lat+','+passenger_gps_long+'&zoom=15&size=600x600&maptype=roadmap&markers=color:blue%7Clabel:P%7C'+passenger_gps_lat+','+passenger_gps_long+'&key=AIzaSyDb1A29Jk9FtTZSiHDlfUPM9mHM42cAiRo">').load(function() {
    $("#passenger_on_map").empty();
    $(this).appendTo('#passenger_on_map');
});

}
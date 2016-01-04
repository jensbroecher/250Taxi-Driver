var seconds = 0, minutes = 0, hours = 0,
    twatch;

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    
    document.getElementById("stopwatch").textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    stopwatchtimer();
}
function stopwatchtimer() {
    twatch = setTimeout(add, 1000);
}

/* Start button */
// start.onclick = timer;

/* Stop button */
// stop.onclick = function() {
//     clearTimeout(twatch);
// }

/* Clear button */
// clear.onclick = function() {
//     h1.textContent = "00:00:00";
//     seconds = 0; minutes = 0; hours = 0;
// }
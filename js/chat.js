function chat() {
    document.getElementById("chat_overlay").className = "animated fadeInUp"
    document.getElementById("chat_overlay").style.display = "block";
}

function chatloader() {
    clientid = document.getElementById("passenger_id").innerHTML;
    localStorage.setItem("clientid", clientid);

    chat_updater = setInterval(function () {
        loadchat();
    }, 3000);
}

function close_chat() {
    document.getElementById("chat_overlay").className = "animated fadeOutDown"
    setTimeout(function () {
        document.getElementById("chat_overlay").style.display = "none";
    }, 800);
}

function loadchat() {

    driverid = localStorage.getItem("driverid");
    clientid = localStorage.getItem("clientid");

    $("#chat_load_messages").load("http://250taxi.com/db/journey/chat.php?task=show_messages&driverid=" + driverid + "&clientid=" + clientid + "", function (data) {

        // Check if there is a new chat message
        var chat_new_from_client = document.getElementById("chat_new_from_client").innerHTML;
        var chat_new_from_driver = document.getElementById("chat_new_from_driver").innerHTML;
        // console.log(chat_new_from_client);

        if (chat_new_from_client == "1") {
            console.log("New chat message from client");
            // localStorage.setItem('toast','New Chat Message');toast();
            // chat();
        }
        if (chat_new_from_driver == "1") {
            console.log("New chat message from driver");
        }

    });
}



$(document).ready(function () {
 
    $( "#chat_message_send_button" ).click(function() {
        chat_send_message();
    });

    $("#chat_message_input").keyup(function (e) {
        if (e.keyCode == 13) {
        chat_send_message();
        }
    });

});

function chat_send_message() {
    var chat_message = document.getElementById("chat_message_input").value;
    
if (/^\s*$/.test(chat_message)) {
    console.log("Only whitespace. Message blocked.");
    var chataudio = new Audio('sound/Computer Error-SoundBible.com-399240903.mp3');chataudio.play();
    return;
}

            driverid = localStorage.getItem("driverid");
            clientid = localStorage.getItem("clientid");

            $.get("http://250taxi.com/db/journey/chat.php?task=send_message&driverid=" + driverid + "&clientid=" + clientid + "&message=" + chat_message + "&origin=driver", function (data) {
                var chataudio = new Audio('sound/bubbley-xrikazen-7430_hifi.mp3');chataudio.play();
            });

            document.getElementById("chat_message_input").value = "";

            $("#chat_load_messages").load("http://250taxi.com/db/journey/chat.php?task=show_messages&driverid=" + driverid + "&clientid=" + clientid + "", function (data) {
                console.log(data);
            });
}

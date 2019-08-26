$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });
});

//  Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAMHuyvC4qf20CTkSOObxevuHEzBowoxqI",
    authDomain: "media-player-efb55.firebaseapp.com",
    databaseURL: "https://media-player-efb55.firebaseio.com",
    projectId: "media-player-efb55",
    storageBucket: "",
    messagingSenderId: "471759249911",
    appId: "1:471759249911:web:c1c447a050b9f55d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var key = database.ref("Artist")

//SEARCH HISTORY INPUTS
$("#search").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var userSearch = $("#input").val().trim()

    // Uploads Search Results to database
    key.push(userSearch);

    $("#input").val("");

    $("#first-artist").text(userSearch);

    //Add Liked Button
    $("#liked").on("click", function (event) {
    event.preventDefault();
    alert(userSearch);
    });
});

// Adds Search to SEARCH HISTORY SIDENAV and DISPLAYS on FIRST ARTIST PAGE SECTION
    key.on("child_added", function (childSnapshot) {

    var userSearch = childSnapshot.val();

    var newList = $("<a>").append($("<a>").text(userSearch));

    newList.addClass("list-group-item");
    newList.attr("href", userSearch);
    
    $("#here").append(newList);
});

//Clear History
    $("#clearHistory").click(function () {
        $("#here").empty();
        key.remove();    
    });

//Clear Liked
$("#clearLiked").on("click", function (event) {
    event.preventDefault();
});






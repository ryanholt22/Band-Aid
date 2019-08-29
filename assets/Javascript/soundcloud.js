// VARIABLES
let trackInput = document.getElementById("trackInput");
let submitButton = document.getElementById("submitButton");
submitButton.onclick = searchTracks;

function searchTracks() {
    let searchResults = trackInput.nodeValue;
    fetch("https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/323195515" + searchResults).then(function(response) {
        if (response.status != 200) {
            console.log("Looks like there was a problem. Status Code" + response.status);
            return;
        }
        response.json().then(function(data) {
            let track = data;
            console.log(track);

        })
    })
}
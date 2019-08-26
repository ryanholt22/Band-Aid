$(document).on("click", ".gems", function () {
    //event.preventDefault();
    var movie = $("#movie-input").val();
    var queryURL; //= "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=" + movie + "&key=AIzaSyDdG-co-zolXTJoNeRYFwE2f7L4qLDVRCY"
    var q2 = "https://itunes.apple.com/search?term=" + movie + "&limit=1"
    var music = {}
    var band;
    var limit = 10;
    var llimit = 0;
    var genres = [];

    $.ajax({
        url: q2,
        method: "GET"
    }).then(function (res) {
        var thing = JSON.parse(res);
        thing = thing.results[0];
        console.log(thing)
        music.artist = thing.artistName
        music.album = thing.collectionName
        music.song = thing.trackName
        music.genre = thing.primaryGenreName
        band = JSON.stringify(music.artist + " " + music.song);//entity=allArtist&attribute=allArtistTerm
        band = band.replace(/ /g, "+")
        band = band.replace(/"/g, "")
        //console.log(music.genre)
        var e = ("<img src = '" + thing.artworkUrl60 + "'>")
        $("#itunes").append(e)
    }).then(function () {
        var q3 = "https://itunes.apple.com/search?term=" + music.genre + "&limit=" + limit;
        //q3 = q3.replace(/ /g, "+")
        $.ajax({
            url: q3,
            method: "GET"
        }).then(function (response) {
            var thing2 = JSON.parse(response);
            console.log(thing2);
            for (var q = 0; q < thing2.results.length; q++) {
                if (thing2.results[q].primaryGenreName === music.genre) {
                    console.log(thing2.results[q])
                    var w = ("<img src = '" + thing2.results[q].artworkUrl60 + "'>")
                    $("#itunes").append(w)
                    limit = limit + 10;

                }
            }
        })
    })
})
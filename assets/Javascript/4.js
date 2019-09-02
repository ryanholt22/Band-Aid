var playpause = false;
var partist = [];
var psong = [];
var lyricsArray = [];
var id;
$(document).on("click", "#search", function () {
  //event.preventDefault();
  var input = $("#input").val();
  var queryURL; //= "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=" + movie + "&key=AIzaSyDdG-co-zolXTJoNeRYFwE2f7L4qLDVRCY"
  var q2 = "https://itunes.apple.com/search?term=" + input + "&limit=5"
  var music = {}
  var suggest = {}
  var band;
  var band2;
  var limit = 20;
  var searchList = [];
  var suggList = [];

  $.ajax({
    url: q2,
    method: "GET"
  }).then(function (res) {
    var tune = JSON.parse(res);
    tune = tune.results;
    for (var w = 0; w < tune.length; w++) {
      var wholediv = $("<div class = 'box'>");
      var u = ("<img src = '" + tune[w].artworkUrl100 + "'>")
      var i = document.createElement("audio");
      i.setAttribute("src", tune[w].previewUrl);
      wholediv.prepend(u);
      wholediv.prepend(i);
      music.artist = tune[w].artistName
      music.album = tune[w].collectionName
      music.song = tune[w].trackName
      music.genre = tune[w].primaryGenreName
      music.track = tune[w].previewUrl
      var p1 = ("<p class = artist>" + music.artist + "</p>") // sets artist name text to html
      var p2 = ("<p class = song>" + music.song + "</p>") // sets song name text to html
      wholediv.prepend(p1);
      wholediv.prepend(p2);
      band = JSON.stringify(music.artist + " " + music.song);//entity=allArtist&attribute=allArtistTerm
      band = band.replace(/ /g, "+")
      band = band.replace(/"/g, "")
      searchList.push(band)
      console.log(music)
      $("#view").after(wholediv); //search div appended includs audio, image, and hidden <p> tags with artist and song
      $(".artist").css('visibility', 'hidden');
      $(".song").css('visibility', 'hidden');
      if (w === 4) {
        //console.log(searchList)
      }
    }
  }).then(function () {
    var q3 = "https://itunes.apple.com/search?term=" + music.genre + "&limit=" + limit;
    //q3 = q3.replace(/ /g, "+")
    $.ajax({
      url: q3,
      method: "GET"
    }).then(function (response) {
      var max = 0
      var thing2 = JSON.parse(response);
      for (var q = 0; q < thing2.results.length; q++) {
        if (thing2.results[q].primaryGenreName === music.genre && max < 5) {
          var wholediv = $("<div class = 'box'>");
          var w = ("<img src = '" + thing2.results[q].artworkUrl100 + "'>")
          var r = document.createElement("audio");
          r.setAttribute("src", thing2.results[q].previewUrl);
          wholediv.prepend(w);
          wholediv.prepend(r);
          suggest.artist = thing2.results[q].artistName
          suggest.album = thing2.results[q].collectionName
          suggest.song = thing2.results[q].trackName
          suggest.genre = thing2.results[q].primaryGenreName
          suggest.track = thing2.results[q].previewUrl
          var p3 = ("<p class = artist>" + suggest.artist + "</p>")
          var p4 = ("<p class = song>" + suggest.song + "</p>")
          wholediv.prepend(p3);
          wholediv.prepend(p4);
          band2 = JSON.stringify(suggest.artist + " " + suggest.song);//entity=allArtist&attribute=allArtistTerm
          band2 = band2.replace(/ /g, "+")
          band2 = band2.replace(/"/g, "")
          suggList.push(band2)
          $("#view").after(wholediv);//suggested div appended includs audio, image, and hidden <p> tags with artist and song
          $(".artist").css('visibility', 'hidden');
          $(".song").css('visibility', 'hidden');
          max++;
        }
      }
    })
  })
})
$(document).on("click", ".box", function () {
  var y = lyricsArray[2];
  var t = $(this).find("audio");
  if (y !== t) {
    t[0].play()
    if (y !== undefined) {
      y[0].pause()
    }
    y = t;
  }
  else if (y === t) {
    t[0].pause()
  }
  var a = $(this).find(".artist")
  var s = $(this).find(".song")
  a = a[0].innerHTML;
  s = s[0].innerHTML;
  lyricsArray = [a, s, y]
  console.log(lyricsArray)
  return lyricsArray;
});

$(document).on("click", "#lyrics", function () {
  var q4 = ("http://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/matcher.lyrics.get?q_track=" + lyricsArray[1] + "&q_artist=" + lyricsArray[0] + "&apikey=12211013789810f0dad17f2ba6f9ac3a")
  $.ajax({
    url: q4,
    method: "GET"
  }).then(function (response) {
    var lyrics = JSON.parse(response);
    lyrics = lyrics.message.body.lyrics.lyrics_body;
    $("?").text(lyrics); //text for lyrics
  })
})
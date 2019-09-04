$(document).on("click", "#search", function () {
  //event.preventDefault();
  var input = $("#input").val();
  //var queryURL;= "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=" + movie + "&key=AIzaSyDdG-co-zolXTJoNeRYFwE2f7L4qLDVRCY"
  var q2 = "http://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?term=" + input + "&limit=1"
  var music = {}
  var suggest = {}
  var limit = 30;

  $.ajax({
    url: q2,
    method: "GET"
  }).then(function (response) {
    var tune = JSON.parse(response);
    tune = tune.results;
    for (var w = 0; w < tune.length; w++) {
      var u = (tune[w].artworkUrl100)
      var i = document.createElement("audio");
      i.setAttribute("src", tune[w].previewUrl);
      $(".img-responsive").attr('src', u)
      music.artist = tune[w].artistName
      music.album = tune[w].collectionName
      music.song = tune[w].trackName
      music.genre = tune[w].primaryGenreName
      music.track = tune[w].previewUrl
      $("#artist").text(music.artist)
      $("#audio").attr('src', music.track)
      $("#song").text(music.song)
    }
  }).then(function () {
    var q3 = "https://itunes.apple.com/search?term=" + music.genre + "&limit=" + limit;
    $.ajax({
      url: q3,
      method: "GET"
    }).then(function (response) {
      var max = 0
      var thing2 = JSON.parse(response);
      for (var q = 0; q < thing2.results.length; q++) {
        if (thing2.results[q].primaryGenreName === music.genre && max < 7) {
          suggest.artist = thing2.results[q].artistName
          suggest.album = thing2.results[q].collectionName
          suggest.song = thing2.results[q].trackName
          suggest.genre = thing2.results[q].primaryGenreName
          suggest.track = thing2.results[q].previewUrl
          $(".i"+max).attr('src', thing2.results[q].artworkUrl100)
          $(".n"+max).text(suggest.artist)
          max++;
        }
      }
    })
  })
  $("#input").val("");
})

$(document).on("click", "#lyrics", function () {
  var d = $(document).find("#song");
  var f = $(document).find("#artist");
  d = d[0].innerHTML;
  f = f[0].innerHTML;
  var q4 = ("http://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/matcher.lyrics.get?q_track=" + d + "&q_artist=" + f + "&apikey=12211013789810f0dad17f2ba6f9ac3a")
  $.ajax({
    url: q4,
    method: "GET"
  }).then(function (response) {
    var lyrics = JSON.parse(response);
    lyrics = lyrics.message.body.lyrics.lyrics_body;
    var g = $(document).find("#lyrics")
    g.text(lyrics);
  })
})
/*$(document).on("click", ".box", function () {
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
});*/
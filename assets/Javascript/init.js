  // Your web app's Firebase configuration
  var firebaseConfig = {
      apiKey: "AIzaSyDxd95LvNLzt-XAYFh0fMl78tcQ7aOqok0",
      authDomain: "project1-5f1b0.firebaseapp.com",
      databaseURL: "https://project1-5f1b0.firebaseio.com",
      projectId: "project1-5f1b0",
      storageBucket: "",
      messagingSenderId: "649025675944",
      appId: "1:649025675944:web:cd941673dba34ea5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();
  var key = database.ref("Artist")


  //SEARCH HISTORY INPUTS
  $("#search").on("click", function(event) {
      event.preventDefault();

      // Grabs user input
      var userSearch = $("#input").val();

      // Uploads Search Results to database
      key.push(userSearch);

      $("#input").val("");

      var currArtist = $("#artist").text(userSearch);
      currArtist = userSearch;

      //Add Liked Button
      $("#liked").on("click", function(event) {
          event.preventDefault();

          var likedList = $("<a>").append($("<a>").text(currArtist))

          likedList.addClass("list-group-item");
          likedList.attr("href", currArtist);

          $("#hereAgain").append(likedList);
      });
  });

  // Adds Search to SEARCH HISTORY SIDENAV and DISPLAYS on FIRST ARTIST PAGE SECTION
  key.on("child_added", function(childSnapshot) {

      var userSearch = childSnapshot.val();

      var newList = $("<a>").append($("<a>").text(userSearch));

      newList.addClass("list-group-item");
      newList.attr("href", userSearch);

      $("#here").append(newList);
  });

  //Clear History
  $("#clearHistory").click(function() {
      $("#here").empty();
      key.remove();
  });

  //Clear Liked
  $("#clearLiked").on("click", function(event) {
      $("#hereAgain").empty();
      key.remove()
  });
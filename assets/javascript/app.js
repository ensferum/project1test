
$("#user-clear").on("click", function() {
     event.preventDefault();
     $("#user-input-name").val(null);

});


function createYouTubeEmbedLink (link) {
    link = document.getElementById('link').value;
    if (link.charAt(12) == 'y') {    //if the 13th character = y (youtube  videos)
        var number = link.substring(32);    //key # = from 33rd character on
        var embed = "https://www.youtube.com/embed/" + number;    //Add youtube link before key #
        document.getElementById('iframe').src = embed;
    }
    else if (link.charAt(12) == 'o') {    //if the 13th character = o (vimeo videos)
        var number = link.substring(18);    //key # = from 19th character on
        var embed = "https://player.vimeo.com/video/" + number;    //Add vimeo link before key #
        document.getElementById('iframe').src = embed;
    }
    else {}
}






function handleAPILoaded() {
  console.log('youtube api ready');
}


function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

$(function() {
    $("form").on("submit", function(e) {
       e.preventDefault();
       console.log('on submit');
       // prepare the request
       var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
            maxResults: 1,
            
      });
       // execute the request
       request.execute(function(response) {
        console.log('test');
          var results = response.result;
          $("#results").html("");
          $.each(results.items, function(index, item) {
            $.get("assets/item.html", function(data) {
                $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
            });
          });
          resetVideoHeight();
       });
    });
    
   $(window).on("resize", resetVideoHeight);
});

function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 9/16);
}

function init() {
    gapi.client.setApiKey("AIzaSyBNszSj_KTlyYE16DegvSVu4Qn6Ivn1Hjwqc");
    gapi.client.load("youtube", "v3", function() {
        // yt api is ready
    });
}



// Initialize Firebase
var config = {
    apiKey: "AIzaSyAuYrWqniGIviMM1LsufSjFkuh6PSBGUh0",
    authDomain: "movies-d6628.firebaseapp.com",
    databaseURL: "https://movies-d6628.firebaseio.com",
    projectId: "movies-d6628",
    Bucket: "movies-d6628.appspot.com",
    messagingSenderId: "959648926177"
};

firebase.initializeApp(config);

// Name a Variable to Reference the Database
var database = firebase.database();

// Database Directory
var movieRef = database.ref("/movies");

// Create Variables
var name = null;

// Listen for First Button Click
$("#user-add-movie").on("click", function() {
    event.preventDefault();
    var nameOfMovie = $("#user-input-name").val().trim();

    if (nameOfMovie === "") {
        return;
    } else {
        console.log(nameOfMovie);
        var newMovie = {
            name: nameOfMovie
        }

        // Save to Firebase
        database.ref("/movies").push(newMovie);

        // Make Input Boxes Blank After Firebase Push
        $("#user-input-name").val(null);
    }
});

// Add New Movie to Firebase
database.ref("/movies").on("child_added", function(x) {

    // Store everything into a variable.
    var nameOfMovie = x.val().name;

    // Add New Movie to Table
    $("#my-movie-list").append("<tr><td>" + nameOfMovie + "</td><td>" + "</td><td class='col-xs-1'>" + "<input type='submit' value='X' class='remove-movie' btn btn-primary btn-sm'>" + "<td><br><br></td>" + "</tr>");

    $("body").on("click", ".remove-movie", function() {
        $(this).closest('tr').remove();
        movieRef.remove();
    });
});

// Listen for Second Button Click ************************API BY SHARAD HERE
$("#user-search-plot").on("click", function() {
    event.preventDefault();
    var nameOfMoviePlot = $("#user-input-name").val().trim();

    if (nameOfMoviePlot === "") {
        return;
    } else {
        console.log(nameOfMoviePlot);
        //window.open("https://www.w3schools.com");
        // Open New Tab
        // Pull Summary from OMDB
        // Display Movie Summary in New Tab
        $("#user-input-name").val(null);
    }
});

function displayMovieInfo() {

       var movie = $(this).attr("data-name");
        var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece";

       // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

         // Creating a div to hold the movie
          var movieDiv = $("<div class='movie'>");

         // Storing the rating data
          var rating = response.Rated;

         // Creating an element to have the rating displayed
          var pOne = $("<p>").text("Rating: " + rating);

         // Displaying the rating
          movieDiv.append(pOne);

         // Storing the release year
          var released = response.Released;

         // Creating an element to hold the release year
          var pTwo = $("<p>").text("Released: " + released);

         // Displaying the release year
          movieDiv.append(pTwo);

         // Storing the plot
          var plot = response.Plot;

         // Creating an element to hold the plot
          var pThree = $("<p>").text("Plot: " + plot);

         // Appending the plot
          movieDiv.append(pThree);

         // Retrieving the URL for the image
          var imgURL = response.Poster;

         // Creating an element to hold the image
          var image = $("<img>").attr("src", imgURL);

         // Appending the image
          movieDiv.append(image);

         // Putting the entire movie above the previous movies
          $("#movies-view").prepend(movieDiv);
        });

$("#user-clear").on("click", function() {
     event.preventDefault();
     $("#user-input-name").val(null);

});
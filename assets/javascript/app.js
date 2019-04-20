$(document).ready(function(){
  // The line below, allows everything that is classified as a button to access giphy //
$(document).on("click", ".btn", function() {
  // This var stores the property of data-game //
  var game = $(this).attr("data-game");
  // This is where we construct our link that will be put into giphy to get the results we need back from the API //
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    game + "&api_key=dc6zaTOxFJmzC&limit=10";

  // This is our AJAX request to go retrieve the content using the method "GET" //
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // This function ONLY happens after we have retrieved the info from the API //
    .then(function(response) {
      
      // Results acts as an array that stores all the gifs that we get from giphy API, for us to use later //
      var results = response.data;
      // This for loop, loops through our array, and allows us to control what gets shown //
      for (var i = 0; i < results.length; i++) {

        // This if statement allows us to filter out anything that has a rating of "R" or "PG-13" //
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          // This is the div for the individual GIFS //
          var gifDiv = $("<div>");

          // If the gif passes our filter, then it goes into the array for ratings //
          var rating = results[i].rating;

          // This creates a p tag for the ratings, so that they can now appear on the page //
          var p = $("<p>").text("Rating: " + rating);

          // This creates the image tag for the GIF, and will have any pre alteration we need //
          var gameImage = $("<img>");

          // gameImage will also have the src tag associated with the picture, along with the link to it //
          gameImage.attr("src", results[i].images.fixed_height.url);

          
          gifDiv.append(p);
          gifDiv.append(gameImage);
          // This allows us to put the gifs from gif div, on to the page //
          $("#gifs-appear-here").prepend(gifDiv);
         
        }
      }
    });
});
// This on click function adds a button to the button list //
// if($("#game-input").val() != ""){
$("#add-game").on("click", function click(){
  if($("#game-input").val() != ""){  
  var input = $("#game-input").val().trim();
      var btntxt = $('<button class="btn btn-success" class= "btn">').text(input).attr("data-game", input);
        $("#buttons-view").append(btntxt);
          $("#game-input").val("");       
          console.log($("#game-input"))
        }
        })
})

  
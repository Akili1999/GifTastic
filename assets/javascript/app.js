$(document).ready(function(){
$(document).on("click", ".btn", function() {
  // In this case, the "this" keyword refers to the button that was clicked
  var game = $(this).attr("data-game");
  // Constructing a URL to search Giphy for the name of the game who said the quote
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    game + "&api_key=dc6zaTOxFJmzC&limit=10";

  // Performing our AJAX GET request
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After the data comes back from the API
    .then(function(response) {
      
      // Storing an array of results in the results variable
      var results = response.data;
      // Looping over every result item
      for (var i = 0; i < results.length; i++) {

        // Only taking action if the photo has an appropriate rating
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          // Creating a div for the gif
          var gifDiv = $("<div>");

          // Storing the result item's rating
          var rating = results[i].rating;

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + rating);

          // Creating an image tag
          var gameImage = $("<img>");

          // Giving the image tag an src attribute of a proprty pulled off the
          // result item
          gameImage.attr("src", results[i].images.fixed_height.url);

          
          gifDiv.append(p);
          gifDiv.append(gameImage);

          // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
          $("#gifs-appear-here").prepend(gifDiv);
        }
      }
    });
});
$("#add-game").on("click", function click(){
    var input = $("#game-input").val().trim();
      var btntxt = $('<button class="btn btn-success" class= "btn">').text(input).attr("data-game", input);
        $("#buttons-view").append(btntxt);
          $("#game-input").val("");
})
})

  
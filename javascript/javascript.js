
        var sports = ["Skateboarding", "Snowboarding", "BMX", "Skydiving", "Wakeboarding", "Surfing", "Parkour", "Skiing", "Basejumping", "Rockclimbing"];

        // Adding click event listen listener to all buttons
        function displaySportGif() {
            // Grabbing and storing the data-animal property value from the button
            var sport = $(this).attr("data-sport");

            // Constructing a queryURL using the sport name
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                sport + "&api_key=Q50vkWNNm1lJPmiRqo7RJbY4cIUWrRiC&limit=6";

            // Performing an AJAX request with the queryURL
            $.ajax({
                url: queryURL,
                method: "GET"
            })
                // After data comes back from the request
                .then(function (response) {
                    console.log(queryURL);

                    console.log(response);
                    // storing the data from the AJAX request in the results variable
                    var results = response.data;

                    // Looping through each result item
                    for (var i = 0; i < results.length; i++) {

                        // Creating and storing a div tag
                        var sportDiv = $("<div>");

                        // Creating a paragraph tag with the result item's rating
                        var p = $("<p>").text("Rating: " + results[i].rating);

                        // Creating and storing an image tag
                        var sportImage = $("<img>");
                        // Setting the src attribute of the image to a property pulled off the result item
                        sportImage.attr("src", results[i].images.fixed_height.url);

                        // assigning a new class to the dynamically created gifs to add attributes to
                        sportImage.addClass("gifs");

                        // creating attributes of "still" and "animate" to pause the gifs on click
                        sportImage.attr('data-still', results[i].images.fixed_height_still.url);
                        sportImage.attr('data-state', 'still');
                        sportImage.attr('data-animate', results[i].images.fixed_height.url);

                        // Appending the paragraph and image tag to the sportDiv
                        sportDiv.append(p);
                        sportDiv.append(sportImage);

                        // Prependng the sportDiv to the HTML page in the "#gifs-appear-here" div
                        $("#gifs-appear-here").prepend(sportDiv);
                    }
                });
        }
        // function to place the buttons on the page
        function renderButtons() {

            $("#buttons-view").empty();

            for (var i = 0; i < sports.length; i++) {

                var a = $("<button>");

                a.addClass("sport-btn");

                a.attr("data-sport", sports[i]);

                a.text(sports[i]);

                $("#buttons-view").append(a);
            }
        }
        // add sport submit button function
        $("#add-sport").on("click", function (event) {
            event.preventDefault();

            var sport = $("#sport-input").val().trim();

            sports.push(sport);

            $('#sport-input').val('');

            renderButtons();

        });
        // function to animate and still the gifs
        $(document).on('click', '.gifs', function () {
            var state = $(this).attr('data-state');
            if (state == 'still') {
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            } else {
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            };
        });
        // on click function to display the gifs on the page
        $(document).on("click", ".sport-btn", displaySportGif);

        renderButtons();
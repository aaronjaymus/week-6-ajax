/*
1. Create button array
2. Create function to print array elements to screen as buttons
	Set button values to use for creating queryURL for GiphyAPI
3. Create input field that adds input value to button array
4. Create function that takes value of array button selected and searches giphy API
	Have function print gifs to screen 
*/

var giphyAPI = {

	teams : [
		"Chicago Bulls",
		"New York Rangers",
		"Dallas Cowboys",
		"Boston Redsox",
		"The Dream Team",
		"Cleveland Cavaliers",
		"Buffalo Bills",
		"UNC Tarheels",
		"Duke Bluedevils"	
	],
	printButtons : function () {
		console.log(this)
		$("#buttonArray").empty();
		for (var i = 0; i < this.teams.length; i++){
			var button = $("<button>");
			button.html(this.teams[i])
				.data("value", this.teams[i])
				.addClass('btn')
				.click(function(){
					giphyAPI.printGif(this);
				});
			$("#buttonArray").append(button);	
		}
	},
	addElement : function () {
		var team = $("#teamInput").val().trim();
		this.teams.push(team);
		this.printButtons();
		$("#teamInput").val('');
	},
	printGif : function (button) {
		//console.log(button);
		var team = $(button).data("value").replace(/\s/g, "+");
		//console.log(team);
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        	team + "&api_key=dc6zaTOxFJmzC&limit=10";
      	
      	$.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
        	var results = response.data;
        	console.log(results);
        	$("#gifPrints").empty();
        	for (var j=0; j<results.length; j++){
        		var teamGif = $("<img>");
        		teamGif.attr("src", results[j].images.fixed_height.url)
        			.data("still", results[j].images.fixed_height_still.url)
        			.data("animate", results[j].images.fixed_height.url)
        			.data("state", "animate")
        			.addClass("gif")
        			.click(function(){
        				giphyAPI.animate(this);
        			});
        		$("#gifPrints").append(teamGif);
        		//console.log(results);
        	}
        });
	},
	animate : function (button) {
		var state = $(button).data("state");
		if(state === "animate"){
			var srcURL = $(button).data("still");
			$(button).attr("src", srcURL)
				.data("state", "still");
		} else {
			var srcURL = $(button).data("animate");
			$(button).attr("src", srcURL)
				.data("state", "animate");
		}
	}

};

$(document).ready( function () {

	giphyAPI.printButtons();
	console.log(giphyAPI.teams);

});


$("#addTeam").click(function(event){
	event.preventDefault();
	giphyAPI.addElement();
});




require("dotenv").config();
var Spotify = require("node-spotify-api");
var axios = require("axios");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var title = process.argv[3];

// Goes through the different command options
function input(command, title) {
    switch (command) {
        case "concert-this":
            concertThis(title);
            break;

        case "spotify-this-song":
            spotifyThis(title);
            break;

        case "movie-this":
            movieThis(title);
            break;

        case "do-what-it-says":
            doThis(title);
            break;
    default:
        console.log("Please enter one of the following commands: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says")         
    }
}
console.log(input(command, title));

function spotifyThis(title) {
    //if (!title) {
       // title = "The Sign"
    //}
    spotify.search({ type: 'track', query: title }, function (err, data) {
    if (err) {
        throw "There was an error: " + err;
    }
var musicData = data.tracks.items[0];
console.log("--------------------------------")
console.log("Search Results:")
console.log("--------------------------------")
console.log("  Artist Name: " + musicData.artists[0].name + "\n  Song Title: " + musicData.name +
"\n  Album Title: " + musicData.album.name +
"\n  Preview URL: " + musicData.preview_url);
console.log("--------------------------------")
});
};



/*
if (command === "concert-this") {
    console.log("concert");
};

if (title === "")



CODE GRAVEYARD


axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(
  function(response) {
    console.log("The movie's rating is: " + response.data.imdbRating);
  }
);

//var bands = new Bands(keys.bands);
//var omdb = new (keys.omdb);

*/
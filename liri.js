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


// Concert-This command call
// Needs some work
function concertThis(title) {
    var queryURl = "https://rest.bandsintown.com/artists/" + title + "/events?app_id=codingbootcamp"
    axios.get(queryURl).then(function(response) {
        var concerts = response.data;
        console.log(concerts);
    })
}



//Movie-This OMDB 
function movieThis(title) {
    if (!title) {
        title = "Mr. Nobody"
    }
    var queryURl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy"


    axios.get(queryURl).then(function (response) {

    });
};

























// Spotify-This-Song!!!!!
function spotifyThis(title) {
    if (!title) {
        title = "Ace of Base"
    }
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

CODE GRAVEYARD

axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(
  function(response) {
    console.log("The movie's rating is: " + response.data.imdbRating);
  }

);

//var bands = new Bands(keys.bands);
//var omdb = new (keys.omdb);

if (command === "concert-this") {
    console.log("concert");
};

if (title === "")

*/
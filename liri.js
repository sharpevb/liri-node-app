require("dotenv").config();
var Spotify = require("node-spotify-api");
var axios = require("axios");
var keys = require("./keys.js");
var moment = require("moment");
var m = moment();
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
            console.log("\n");
            console.log("-------------------------------------------");
            console.log("Please enter one of the following commands")
            console.log("-------------------------------------------");
            console.log("concert-this \nspotify-this-song \nmovie-this \ndo-what-it-says \n")
    }
}
console.log(input(command, title));


// Concert-This command call
// Needs Moment.js 
function concertThis(title) {
    if (!title) {
        console.log("Please type a band or artist")
    }
    var queryURl = "https://rest.bandsintown.com/artists/" + title + "/events?app_id=codingbootcamp"
    axios.get(queryURl).then(function (response) {
        var concertList = response.data

        //Trying to get the datetime formatted using Moment 
        //m = moment.utc("2019-07-25T18:30:00, MM/DD/YYYY HH:mm:ss");   

        for (var i = 0; i < concertList.length; i++) {
            console.log("--------------------------------");
            console.log("Search Results:");
            console.log("--------------------------------");
            console.log("  Venue: " + concertList[i].venue.name);
            console.log("  Country: " + concertList[i].venue.country);
            console.log("  State: " + concertList[i].venue.region);
            console.log("  City: " + concertList[i].venue.city);
            console.log("  Date: " + concertList[i].datetime)
            console.log("\n")
        }
    })
}



//Movie-This OMDB !!!!!
function movieThis(title) {
    if (!title) {
        title = "Mr. Nobody"
    }
    var queryURl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy"
    axios.get(queryURl).then(function (response) {
        console.log("--------------------------------");
        console.log("Search Results:");
        console.log("--------------------------------");
        console.log("  Title: " + response.data.Title);
        console.log("  Released: " + response.data.Released);
        console.log("  IMDb Rating: " + response.data.imdbRating)
        console.log("  Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        console.log("  Produced in: " + response.data.Country);
        console.log("  Language: " + response.data.Language);
        console.log("  Plot: " + response.data.Plot);
        console.log("  Actors: " + response.data.Actors);
        console.log("\n");

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
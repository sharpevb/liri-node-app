require("dotenv").config();
var Spotify = require("node-spotify-api");
var axios = require("axios");
var keys = require("./keys.js");
var fs = require("fs");
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
console.log(input(command, title)); //"undefined in terminal"? but without it, no data returns


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
        var movieInfo = response.data
        console.log("--------------------------------");
        console.log("Search Results:");
        console.log("--------------------------------");
        console.log("  Title: " + movieInfo.Title + "\n  Released: " + movieInfo.Released + "\n  IMDb Rating: " + movieInfo.imdbRating + "\n  Rotten Tomatoes Rating: " + movieInfo.Ratings[1].Value + "\n  Produced in: " + movieInfo.Country + "\n  Language: " + movieInfo.Language + "\n  Plot: " + movieInfo.Plot + "\n  Actors: " + movieInfo.Actors);
        console.log("\n");

    });
};


// Spotify-This-Song!!!!!
function spotifyThis(title) {
    // Displays info about "The Sign" if no song was typed in. 
    // Putting "The Sign" instead of "Ace fo Base" returned a track off of the Spiderverse Soundtrack
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
        console.log("\n")
    });
};

// Do-What-It-Says
function doThis() {
    fs.readFile("random.txt", "utf8", function (err, data) {
       // Error msg
        if (err) {
            return console.log(err);
        }

        var dataArr = data.split(",");
        console.log(dataArr);

        // Grabs "I Want It That Way" song info via "spotify-this-song" command from random.txt
        if (dataArr[0] === "spotify-this-song") {
            var txtSong = dataArr[1].trim();
            spotifyThis(txtSong);
        }
        // Grabs "Mulan" movie info via "movie-this" command from random.txt
        if (dataArr[2] === "movie-this") {
            var txtMovie = dataArr[3].trim();
            movieThis(txtMovie);
        }
        // Grabs "Pharrell Williams" concert info via "concert-this" command from random.txt
        // Error msg
        if (dataArr[4] === "concert-this") {
            var txtConcert = dataArr[5].trim();
            concertThis(txtConcert);
        }
    })
}
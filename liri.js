require("dotenv").config();
var Spotify = require("node-spotify-api");
var axios = require("axios");
var keys = require("./keys.js");
var fs = require("fs");
var moment = require("moment");
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
console.log(input(command, title)); // This is "undefined" in terminal. but without it, no data returns

// Concert-This (Bandsintown)
function concertThis(title) {
    if (!title) {
        console.log("Please type a band or artist")
    }

    var queryURl = "https://rest.bandsintown.com/artists/" + title + "/events?app_id=codingbootcamp"

    axios.get(queryURl).then(function (response) {
        
        var concertList = response.data

        for (var i = 0; i < concertList.length; i++) {
            // Reformatting the datetime data from bandsintown using Moment               
            var date = concertList[i].datetime.slice(0, 10)
            var format = "YYYY-MM-DD";
            var convert = moment(date, format);
            var finalDate = convert.format("MM/DD/YYYY")

            console.log("--------------------------------");
            console.log("Concert Search Results:");
            console.log("--------------------------------");
            console.log("  Venue: " + concertList[i].venue.name + "\n  Country: " + concertList[i].venue.country + "\n  State: " + concertList[i].venue.region + "\n  City: " + concertList[i].venue.city + "\n  Date: " + finalDate);
            console.log("\n");
        }
    })
}


//Movie-This (OMDb)
function movieThis(title) {
    if (!title) {
        title = "Mr. Nobody"
    }

    var queryURl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy"

    axios.get(queryURl).then(function (response) {
        
        var movieInfo = response.data
        
        console.log("--------------------------------");
        console.log("Movie Search Results:");
        console.log("--------------------------------");
        console.log("  Title: " + movieInfo.Title + "\n  Released: " + movieInfo.Released + "\n  IMDb Rating: " + movieInfo.imdbRating + "\n  Rotten Tomatoes Rating: " + movieInfo.Ratings[1].Value + "\n  Produced in: " + movieInfo.Country + "\n  Language: " + movieInfo.Language + "\n  Plot: " + movieInfo.Plot + "\n  Actors: " + movieInfo.Actors);
        console.log("\n");
    });
};


// Spotify-This-Song (node-spotify-api)
function spotifyThis(title) {
    
    // Displays info about "The Sign" if no song was typed in. 
    // Putting "The Sign" instead of "Ace of Base" returned a track off of the Spiderverse Soundtrack
    if (!title) {
        title = "Ace of Base"
    }

    spotify.search({ type: 'track', query: title }, function (err, data) {
        if (err) {
            throw "There was an error: " + err;
        }

        var musicData = data.tracks.items[0];

        console.log("--------------------------------")
        console.log("Song Search Results:")
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

        // Grabs "U2" concert dates via "concert-this" command from random.txt
        // Error msg
        if (dataArr[4] === "concert-this") {
            var txtConcert = dataArr[5].trim();
            concertThis(txtConcert);
        }

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
    })
}
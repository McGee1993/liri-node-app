require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var request = require("request");
var moment = require("moment");
moment().format();
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios")

var cmd = process.argv[2];
var input = process.argv[3];
var input2 = process.argv[4];
var input3 = process.argv[5];

search = input
if (!input2 && !input3) {
    console.log("\n" + cmd + "\n" + search);
} else if (!input3) {
    search = (input + " " + input2);
    console.log("\n" + cmd + "\n" + search);
} else {
    search = (input + " " + input2 + " " + input3);
    console.log("\n" + cmd + "\n" + search);
}

switch (cmd) {
    case "concert-this":
        command = "Concert Search: "
        concertThis(search);
        break;
    case "spotify-this-song":
        spotifyThis(search);
        break;
    case "movie-this":
        movieThis(search);
        break;
    case "do-what-it-says":
        doThis();
        break;
    default:
        console.log("Invalid command.")
}

function logThis(data) {
    fs.appendFile("log.txt", "\r\n\r\n", function(err) {
        if (err) {
            return console.log(err);
        }
    });
    fs.appendFile("log.txt", (data), function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("\nlog.txt updated!")
    });
}

function concertThis(bandSearch) {
    if (!bandSearch) {
        bandSearch = "White Reaper"
    };
    console.log("\n==========================================================================");
    bandSearch = bandSearch.split(" ").join("+");
    var queryUrl = "https://rest.bandsintown.com/artists/" + bandSearch + "/events?app_id=codingbootcamp#";
   
    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var concert = JSON.parse(body);
            var concertDate = concert[0].datetime;
            var momentDate = moment().format("L");
            let output = "\n==========================================================================" + "\nVenue: " + concert[0].venue.name + "\nLocation: " + concert[0].venue.city + ", " + concert[0].venue.region + "\nDate : " + momentDate + "\n==========================================================================";
            console.log(output);
            logThis(output);
        };
    });
};

function spotifyThis(songSearch) {
    if (!songSearch) {
        songSearch = "Hells Bells";
    };
    console.log("\n==========================================================================");
    spotify.search({ type: "track", query: songSearch}, function(err, data) {
        if (err) {
            console.log("The following error occurred: " + err);
            return;
        } else {
            let output = "\n==========================================================================" + "\nArtist Name: " + data.tracks.items[0].album.artists[0].name + "\nSong Name: " + data.tracks.items[0].name + "\nAlbum Name: " + data.tracks.items[0].album.name + "\nPreview Link: " + data.tracks.items[0].album.external_urls.spotify +"\n=========================================================================="
            console.log(output);
            logThis(output);
        };
    });
};

function movieThis(movieSearch) {
    if (!movieSearch) {
        movieSearch = "last of the mohicans"
    };
    console.log("\n==========================================================================");
    movieSearch = movieSearch.split(" ").join("+")
    axios
        .get("http://www.omdbapi.com/?t=" + movieSearch + "&y=&plot=short&apikey=trilogy")
        .then(function(response) {
            let output = "\n==========================================================================" + "\nTitle: " + response.data.Title + "\nYear released: " + response.data.Year + "\nRated : " + response.data.Rated + "\nCountry: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nStarring: " + response.data.Actors + "\nIMDB Rating: " + response.data.imdbRating + "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\n=========================================================================="
            console.log(output)
            logThis(output)
        })
        .catch(function(error) {
            if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            } else if (error.request) {
            console.log(error.request);
            } else {
            console.log("Error", error.message);
            }
            console.log(error.config);
        })
}

function doThis() {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) throw err;
        command = data.split(",")
        if (command[0] == "spotify-this-song") {
            spotifyThis(command[1])
        } else if (command[0] == "concert-this") {
            concertThis(command[1])
        } else if (command[0] == "movie-this") {
            movieThis(command[1])
        }
    })
}
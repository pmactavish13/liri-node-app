require("dotenv").config();

// npm apps
var Spotify = require('node-spotify-api');
var request = require("request");
var Twitter = require('twitter');
var fs = require("fs");

// access keys.js to get TWITTER and SPOTIFY api access
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// collect arguments entered into terminal
var infoEntered = process.argv
var action = process.argv[2];

// make data after action (title or song name) into a string
var title = ""
if (process.argv[3] !== undefined) {
    for (i = 3; i < infoEntered.length; i++) {
        title += infoEntered[i] + " ";
    };
};

// what to do with data entered into terminal
switch (action) {
    case "movie-this":
        movie();
        break;

    case "spotify-this-song":
        spotifyTitle();
        break;

    case "my-tweets":
        tweets();
        break;

    case "do-what-it-says":
        doIt();
        break;

    default:
        var logDefault = "************************ DEFAULT - NO ENTRY *************************\nThis is not a recognized command.\nPlease enter one of the following commands:\n1. To search IMDB for a movie title: node liri.js movie-this <movie title>\n2. To search Spotify for a song title: node liri.js spotify-this-song <song title>\n3. To see the last 20 of my Twitter tweets: node liri.js my-tweets\n4. For a random search: node liri.js do-what-it-says\n*********************************************************************\n";
        console.log(logDefault);
        fs.appendFile("log.txt", logDefault, function (err) {
            if (err) {
                return console.log(err);
            };
        });
};
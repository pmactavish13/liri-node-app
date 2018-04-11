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
var infoEntered = process.argv;
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

// *********************** Movie ***************************
// what to do if no movie title specified, splits given title into IMDBapi syntax
function movie() {
    if (process.argv[3] === undefined) {
        title = "Mr.+Nobody";
        movieInfo();
    } else if (title !== undefined) {
        titleSplit = title.split(" ");
        title = titleSplit.join("+");
        movieInfo();
    };
};

// contact OMDBapi for movie info
function movieInfo() {
    var queryURL = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";

    request(queryURL, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            if (body) {
                var data = JSON.parse(body);
                if (data.Error == 'Movie not found!') {
                    var logNoMovies = "\n********************************** MOVIE THIS **********************************\nOMDB could not find any movies that matched that title.  Please try again.\n********************************************************************************\n";
                    console.log(logNoMovies);
                    fs.appendFile("log.txt", logNoMovies, function (err) {
                        if (err) {
                            return console.log("No movie by that title data did not append to log.txt file.");
                        };
                    });
                } else if (data.Ratings.length < 2) {
                    var logMovies = "\n********************************** MOVIE THIS **********************************\nTitle: " + data.Title + "\nRelease Year: " + data.Year + "\nIMDB Rating: " + data.imdbRating + "\nRotten Tomatoes Rating: No Rotten Tomatoes Rating\nCountry movie produced in: " + data.Country + "\nLanguage: " + data.Language + "\nPlot: " + data.Plot + "\nActors: " + data.Actors + "\n********************************************************************************\n";
                    console.log(logMovies);
                    fs.appendFile("log.txt", logMovies, function (err) {
                        if (err) {
                            return console.log("Movie data did not append to log.txt file.");
                        };
                    });
                    return
                } else if (data.Ratings[1].Value !== undefined) {
                    var logMovies = "\n********************************** MOVIE THIS **********************************\nTitle: " + data.Title + "\nRelease Year: " + data.Year + "\nIMDB Rating: " + data.imdbRating + "\nRotten Tomatoes Rating: " + data.Ratings[1].Value + "\nCountry movie produced in: " + data.Country + "\nLanguage: " + data.Language + "\nPlot: " + data.Plot + "\nActors: " + data.Actors + "\n********************************************************************************\n";
                    console.log(logMovies);
                    fs.appendFile("log.txt", logMovies, function (err) {
                        if (err) {
                            return console.log("Movie data did not append to log.txt file.");
                        };
                    });
                };
            };
        };
        if (error) {
            var logMovieError = "OMDBapi response error. Please try again.\n"
            console.log(logMovieError)
            fs.appendFile("log.txt", logMovieError, function (err) {
                if (err) {
                    return console.log("OMDBapi response error message did not append to log.txt file.");
                };
            });
        };

    });
}

// ***************************** Spotify *************************
// What to do if no title entered or if title splits into spotify syntax
function spotifyTitle() {
    if (process.argv[3] === undefined) {
        title = "The%20Sign%20Ace%20of%20Base";
        spotifyInfo();
    } else if (title !== undefined) {
        titleSplit = title.split(" ");
        title = titleSplit.join("%20");
        spotifyInfo();
    };
};

// Spotify api call and return info
function spotifyInfo() {
    spotify.search({
        type: 'track',
        query: title,
        limit: 1,
    }, function (err, data) {
        if (data) {
            var info = data.tracks.items
            var logSpotify = "\n****************************** SPOTIFY THIS SONG *******************************\nArtist: " + info[0].artists[0].name + "\nSong title: " + info[0].name + "\nAlbum name: " + info[0].album.name + "\nURL Preview: " + info[0].preview_url + "\n********************************************************************************\n";
            console.log(logSpotify)
            fs.appendFile("log.txt", logSpotify, function (err) {
                if (err) {
                    return console.log("Spotify song data was not appended to the log.txt file.");
                };
            });
        } else if (err) {
            var logNoSpotify = "\n****************************** SPOTIFY THIS SONG *******************************\nSpotify could not find a song with that title. Please try Again.\n********************************************************************************\n";
            console.log(logNoSpotify);
            fs.appendFile("log.txt", logNoSpotify, function (err) {
                if (err) {
                    return console.log("Spotify no song data was not appended to the log.txt file.");
                };
            });
        }
    });
};

// ************************** Twitter **************************
// Twitter api call and retun 20 tweets
function tweets() {
    
    var params = {
        screen_name: 'pmactavish13',
        count: 20
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            var logTweetHeader = ("\n********************************** MY TWEETS ***********************************");
            console.log(logTweetHeader)
            fs.appendFile("log.txt", logTweetHeader + "\n", function (err) {
                if (err) {
                    return console.log(err);
                }
            });
            for (i = 0; i < tweets.length; i++) {
                var logTweets = i + 1 + ". Tweet: " + tweets[i].text + "\n    Created: " + tweets[i].created_at;
                console.log(logTweets)
                // add tweets to log.txt file
                fs.appendFile("log.txt", logTweets + "\n********************************************************************************\n", function (err) {
                    if (err) {
                        return console.log(err);
                    }
                });
                console.log("********************************************************************************");
            };
        };
    });
};
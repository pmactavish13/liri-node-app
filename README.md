# liri-node-app
LIRI (Language_ Interpretation and Recognition Interface) -command line node app that takes in parameters and gives you back data from SPOTIFYapi, IMDBapi and TWITTERapi 

File liri.js can take in one of the following commands:

    * `my-tweets`

    * `spotify-this-song`

    * `movie-this`

    * `do-what-it-says`

### What Each Command Should Do

`node liri.js my-tweets`

  * This will show your last 20 tweets and when they were created at in your terminal/bash window.

  * Use Twitter - https://www.npmjs.com/package/twitter

************************************************************

`node liri.js spotify-this-song '<song name here>'`

   * This will show the following information about the song in your terminal/bash window
     
     * Artist(s)
     
     * The song's name
     
     * A preview link of the song from Spotify
     
     * The album that the song is from

   * If no song is provided then your program will default to "The Sign" by Ace of Base.
   
   * utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.
   
***************************************************************
   
`node liri.js movie-this '<movie name here>'`

   * This will output the following information to your terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

   * Use the request package to retrieve data from the OMDB API

****************************************************************

`node liri.js do-what-it-says`
   
   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
     
     * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
     
****************************************************************

* log the data to your terminal/bash window, output the data to a .txt file called `log.txt`.
 

require('dotenv').config();
// const { query } = require('express');
const superagent = require('superagent');
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

// const cacheMemory = require('../cache/cacheMemory');

function handleMovie(req, res) {

  try {
    const movieUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${MOVIE_API_KEY}`;
    // const page,language = req.query.query;
    const language = req.query.language;
    const page = req.query.page;

    const params = {
      // api_key: MOVIE_API_KEY,
      // query: page,language,
      language: language,
      page: page

    };
    // console.log(cacheMemory);

    // if (cacheMemory[language, page]) {
    //   console.log(' we got the movie from the cache');

    //   res.status(200).send(cacheMemory[page, language]);
    // }

    // else {
    superagent.get(movieUrl).query(params).then(movieDbData => {
      const movieArray = movieDbData.body.results.map(data => new Movie(data));
      // cacheMemory[page, language] = movieArray;
      movieArray.length = 20; // to set the array response we get to only 12 movies.
      console.log(' we got the movie from the api');
      res.send(movieArray);
    });
    // }
  }
  catch (error) { console.log(error); }
}

class Movie {
  constructor(data) {
    this.title = data.original_title;
    this.image = 'http://image.tmdb.org/t/p/w342' + data.poster_path;
    this.releaseDate = data.release_date;
    this.rating = data.vote_average;
  }
}

module.exports = handleMovie;

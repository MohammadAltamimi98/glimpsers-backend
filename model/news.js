require('dotenv').config();
// const { query } = require('express');
const superagent = require('superagent');
const NEWS_API_KEY = process.env.NEWS_API_KEY;

// const cacheMemoryNews = require('../cache/cacheMemoryNews');



class News {
  constructor(data) {
    this.author = data.author;
    this.title = data.title;
    this.description = data.description;
    this.url = data.url;
    this.urlToImage = data.urlToImage;
    this.publishedAt = data.publishedAt;
  }

}

function handleNews(req, res) {

  try {
    const newsUrl = `https://newsapi.org/v2/everything?apiKey=${NEWS_API_KEY}`;
    const q = req.query.q;
    const from = req.query.from;
    const sortBy = req.query.sortBy;



    const params = {
      // apiKey: NEWS_API_KEY,
      q: q,
      from: from,
      sortBy: sortBy,
    };
    // console.log(cacheMemoryNews);

    // if (cacheMemoryNews[q, from , sortBy]) {
    //   console.log(' we got the news from the cache');

    //   res.status(200).send(cacheMemoryNews[q, from , sortBy]);
    // }

    // else {
    superagent.get(newsUrl).query(params).then(newsDbData => {
      const newsArray = newsDbData.body.articles.map(data => new News(data));
      // cacheMemoryNews[q, from , sortBy] = newsArray;
      newsArray.length = 20; // to set the array response we get to only 12 movies.
      console.log(' we got the news from the api');
      res.send(newsArray);
      console.log(newsArray);
    });
    // }


  }
  catch (error) { console.log(error); }

}

module.exports = handleNews;

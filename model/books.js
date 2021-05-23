require('dotenv').config();
// const { query } = require('express');
const superagent = require('superagent');
const BOOKS_API_KEY = process.env.BOOKS_API_KEY;

const cacheMemoryBooks = require('./cacheMemoryBooks');

class Books {
  constructor(data) {
    this.title = data.title;
    this.description = data.description;
    this.author = data.author;
    this.publisher = data.publisher;
  }
}

function handleBooks(req, res) {

  try {
    const booksUrl = `https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=${BOOKS_API_KEY}`;

    const price = req.query.price;

    const params = {
      price: price,
    };


    if (cacheMemoryBooks[price]) {
      console.log(' we got the books from the cache');

      res.status(200).send(cacheMemoryBooks[price]);
    }
    else {
      superagent.get(booksUrl).query(params).then(booksDbData => {
        const booksArray = booksDbData.body.results.map(data => new Books(data));
        cacheMemoryBooks[price] = booksArray;
        booksArray.length = 20; // to set the array response we get to only 12 bookss.

        console.log(' we got the books from the api');
        // console.log(booksArray);
        res.send(booksArray);
      });

    }
  }


  catch (error) { console.log(error); }

}



module.exports = handleBooks;

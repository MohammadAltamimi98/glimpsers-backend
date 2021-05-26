require('dotenv').config();
const superagent = require('superagent');
const BOOKS_API_KEY = process.env.BOOKS_API_KEY;


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


    superagent.get(booksUrl).query(params).then(booksDbData => {
      const booksArray = booksDbData.body.results.map(data => new Books(data));

      booksArray.length = 20;

      res.send(booksArray);
    });


  }


  catch (error) { console.log(error); }

}

module.exports = handleBooks;

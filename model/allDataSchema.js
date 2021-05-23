// requiring mongoose
const mongoose = require('mongoose');
const childSchema = require('./childSchema');

const allDataSchema = new mongoose.Schema({
  email: String,
  name: String,
  imageUrl: String,
  interest: { movie: Boolean, news: Boolean, books: Boolean, art: Boolean, },
  posts: [childSchema],
});

const UserData = mongoose.model('data', allDataSchema);

async function user(email, name, imageUrl, movie, news, books, art) {
  const newData = new UserData({
    email: email,
    name: name,
    imageUrl: imageUrl,
    interest: { movie: movie, news: news, books: books, art: art },
    posts: []
  });
  await newData.save()
  console.log('newUser added');
}

function filterData(req, res) {
  const { email } = req.query;
  console.log(email);
  UserData.find({ email: email }, function (err, ownerData) {
    if (ownerData.length === 0) {
      res.send('not found');
    }
    else {
      return res.send(ownerData);
    }
  });
}

module.exports = { filterData, UserData, user };

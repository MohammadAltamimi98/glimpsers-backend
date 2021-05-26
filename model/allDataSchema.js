// requiring mongoose
const mongoose = require('mongoose');
const childSchema = require('./childSchema');

const allDataSchema = new mongoose.Schema({
  email: String,
  name: String,
  imageUrl: String,
  interest: {
    movie: Boolean,
    news: Boolean,
    books: Boolean,
    art: Boolean,
    cats: Boolean,
    food: Boolean,
  },
  posts: [childSchema],
});

const UserData = mongoose.model('data', allDataSchema);

const user = async (email, name, imageUrl, movie, news, books, art, cats, food) => {
  const newData = new UserData({
    email: email,
    name: name,
    imageUrl: imageUrl,
    interest: { movie: movie, news: news, books: books, art: art, cats: cats, food: food },
    posts: []
  });
  await newData.save();
}

const filterData = (req, res) => {
  const { email } = req.query;
  UserData.find({ email: email }, function (err, ownerData) {
    if (ownerData.length === 0) {
      res.send('not found');
    }
    else {
      return res.send(ownerData);
    }
  });
}

module.exports = { UserData, user, filterData };

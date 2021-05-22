// requiring mongoose
const mongoose = require('mongoose');

const allDataSchema = new mongoose.Schema({
  data: { parentSchema }
});

// creating schemas
const parentSchema = new mongoose.Schema({
  email: String,
  name: String,
  imageUrl: String,
  interest: { movie: Boolean, news: Boolean },
  posts: { childSchema },
});

const childSchema = new mongoose.Schema({
  description: String,
  date: Number,
  numberOfLikes: Number,
  comments: { commentSchema },
});

const commentSchema = new mongoose.Schema({
  commet: String,
  date: Number,
  commenterImage: String,
  nameOfCommenter: String,
  numberOfLikes: Number,
});

// calling the model
const allDataModel = mongoose.model('data', allDataSchema);

function filterData(req, res) {

  const { email } = req.query;
  // console.log(email);
  allDataModel.find({ email: email }, function (err, ownerData) {
    if (err){
      const { email, name, imageUrl} = req.query;

      const newUser = new allDataModel({
        email: email,
        name: name,
        imageUrl: imageUrl,
        interest: { movie: false, news: false },
        posts: {},
      });
      res.send(newUser.save());
    } res.send('not found create new user');
    return res.send(ownerData[0].data);
  });

  // res.send(getbooksByOwner())
}


module.exports = filterData;

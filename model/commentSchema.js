const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  commet: String,
  date: Number,
  commenterImage: String,
  nameOfCommenter: String,
  numberOfLikes: Number,
});

module.exports=commentSchema;

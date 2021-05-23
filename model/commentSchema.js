const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  comment: String,
  date: String,
  commenterImage: String,
  nameOfCommenter: String,
  numberOfLikes: Number,
});

module.exports = commentSchema;

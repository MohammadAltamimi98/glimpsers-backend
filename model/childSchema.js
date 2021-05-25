const mongoose = require('mongoose');
const commentSchema = require('./commentSchema');

const childSchema = new mongoose.Schema({
  description: String,
  date: String,
  numberOfLikes: Number,
  imageUrl: String,
  commentsArray: [commentSchema],
});

module.exports = childSchema;

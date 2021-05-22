const mongoose = require('mongoose');
const commentSchema = require('./commentSchema');
const childSchema = new mongoose.Schema({
  description: String,
  date: Number,
  numberOfLikes: Number,
  comments: [{ commentSchema }],
});

module.exports = childSchema;

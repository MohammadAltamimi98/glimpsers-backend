const mongoose = require('mongoose');
const childSchema = require('./childSchema');

const ParentSchema = new mongoose.Schema({
  email: String,
  name: String,
  imageUrl: String,
  interest: { movie: Boolean, news: Boolean },
  posts: [childSchema],
});

module.exports = ParentSchema;

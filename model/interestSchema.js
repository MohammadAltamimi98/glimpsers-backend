require('dotenv').config();
// const { response } = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');



const commentSchema = new mongoose.Schema({
  nameOfCommenter: String,
  numberOfLikes: Number,
  imageOfCommenter: String,
  comment: String,
  date: String,
});



// generating the schemas
const interestSchema = new mongoose.Schema({
  numberOfLikes: Number,
  comments: [commentSchema]
});


const NewInterestSchema = mongoose.model('interestCollection', interestSchema);


function seed() {
  const interestTest = new NewInterestSchema({
    numberOfLikes: '5',
    comments: [{
      nameOfCommenter: 'example',
      numberOfLikes: '7',
      imageOfCommenter: 'example',
      comment: 'example',
      date: '77777',
    }]
  });


  interestTest.save();
  console.log('seed.done');
}

seed();



module.exports = seed;

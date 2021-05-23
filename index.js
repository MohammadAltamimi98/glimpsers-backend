'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const schema = require('./model/allDataSchema');

const app = express();

app.use(cors());
app.use(express.json());

//env
const PORT = process.env.PORT || 3070;
const DB_URL = process.env.DB_URL;

mongoose.connect(
  `${DB_URL}/data`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.get('/', (req, res) => {
  res.send('glimpsers');
});

app.get('/data', schema.filterData);

app.post('/addnewuser', (req, res) => {
  const { email, name, imageUrl, movie, news, books, art } = req.body;
  schema.user(email, name, imageUrl, movie, news, books, art);
  res.send('New User Added');
});

app.post('/addnewpost', addNewPost);

function addNewPost(req, res) {
  const { email, description, date, numberOfLikes, post, commit, comment, commenterImage, nameOfCommenter } = req.body;
  if (post === true) {
    console.log('post');
    schema.UserData.find({ email: email }, (error, ownerData) => {
      if (error) res.send('didnt work creat');

      ownerData[0].posts.push({
        description: description,
        date: date,
        numberOfLikes: numberOfLikes,
        commentsArray: []
      });
      ownerData[0].save();
      res.send(ownerData[0].posts);

    });
  } else if (commit === true) {
    console.log('commit');



    schema.UserData.find({ email: email }, (error, ownerData) => {
      if (error) res.send('didnt work creat at comment');
      console.log('in comment ');
      console.log(ownerData[0].posts[0].commentsArray);

      ownerData[0].posts[0].commentsArray.push({

        comment: comment,
        date: date,
        commenterImage: commenterImage,
        nameOfCommenter: nameOfCommenter,
        numberOfLikes: numberOfLikes,

      });
      ownerData[0].save();
      res.send(ownerData[0].posts[0].commentsArray);
    });


  } else {
    res.send('wrong data');
  }

}

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});

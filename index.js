'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const schema = require('./model/allDataSchema');
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect(
  `mongodb://localhost:27017/data`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
//env
const PORT = process.env.PORT || 3070;

app.get('/', (req, res) => {
  res.send('glimpsers');
});

app.get('/data', schema.filterData);

app.post('/addnewuser', (req, res) => {
  const { email, name, imageUrl, movie, news, books, art } = req.body;
  schema.user(email, name, imageUrl, movie, news, books, art);
  res.send('New User Added');
});

// app.put('/data', update);


// function addUser(req, res) {
//   const { email } = req.body;
//   // console.log(schema.UserData);
//   schema.UserData.find({ email: email }, (err, ownerData) => {
//     if (ownerData.length === 0) {
//       console.log(ownerData);
//       console.log('in yessssssssssssss 11111111');
//       const { email, name, imageUrl, movie, news, books, art } = req.body;
// schema.user(email, name, imageUrl, movie, news);
// console.log('this is', req.body);
// const newData = new schema.UserData({
//   email: email,
//   name: name,
//   data: [{
//     imageUrl: imageUrl,
//     interest: { movie: movie, news: news },
//     posts: [{}],
//   }]
// });
// console.log('in yessssssssssssss 22222222222');
// newData.save();
// console.log(newData);
// res.send('ok');
//     } else {
//       console.log(ownerData);
//       console.log('else');
//       // ownerData[0].save();
//       res.send('aaaaa');
//     }
//   });
// }



app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});

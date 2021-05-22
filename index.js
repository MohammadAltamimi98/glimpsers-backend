'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const Schema = require('./model/allDataSchema');
// const ParentSchema = require('./model/parentSchema');
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
function seed() {
  const newData = new Schema.AllDataModel({
    data: [{
      email: 'morjaradat@gmail.com1111',
      name: 'Mohammad Jaradat',
      imageUrl: 'https://lh3.googleusercontent.com/a/AATXAJz80QsdnZHdfk8xCKP7KDew5wYRBcEglH7RQNbw=s96-c',
      interest: { movie: false, news: false },
      posts: [{}]
    }]

  });
  newData.save();
  console.log('seed done');
}
// seed();
app.get('/data', Schema.filterData);

app.post('/data', addUser);

function addUser(req, res) {
  const { email } = req.body;
  console.log(Schema.AllDataModel);
  Schema.AllDataModel.find({ email: email }, (err, ownerData) => {
    if (err === 'not found') {
      console.log(ownerData);
      console.log(err);
      const { email, name, imageUrl, movie, news } = req.body;
      console.log('this is', req.body);
      const newUser = new Schema.AllDataModel({
        data: [{
          email: email,
          name: name,
          imageUrl: imageUrl,
          interest: { movie: movie, news: news },
          posts: [{}],
        }]
      });
      console.log(newUser);
      // Schema.AllDataModel.push(newUser.save());
      res.send('ok');
    } else {
      console.log(ownerData);
      console.log('else');
      // ownerData[0].save();
      res.send('aaaaa');
    }
  });
}

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});

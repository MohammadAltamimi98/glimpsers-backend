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

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});

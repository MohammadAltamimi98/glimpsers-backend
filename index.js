'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
app.use(cors());

mongoose.connect(
  `//localhost:27017/data`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
//env
const PORT = process.env.PORT||3007;

app.get('/', (req, res) => {
  res.send('glimpsers');
});

app.get('/data',(req, res)=>{
  res.send('work');
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});

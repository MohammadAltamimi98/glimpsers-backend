'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

//env
const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send('glimpsers');
});


app.listen(PORT);

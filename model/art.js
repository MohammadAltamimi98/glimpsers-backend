require('dotenv').config();
// const { query } = require('express');
const superagent = require('superagent');


const cacheMemory = require('./cacheArtMemory');

function handleArt(req, res) {

  try {
    const artUrl = `https://api.artic.edu/api/v1/artworks`;
    const limit = req.query.limit;
    const page = req.query.page;
    const fields = req.query.fields;
    //{ 'title', 'image_id' };

    const params = {

      page: page,
      limit: limit,
      fields: fields
    };
    console.log(cacheMemory);



    if (cacheMemory[limit, page, fields]) {
      console.log(' we got the art from the cache');

      res.status(200).send(cacheMemory[page, limit, fields]);
    }

    else {
      superagent.get(artUrl).query(params).then(artDbData => {
        const artArray = artDbData.body.data.map(element => new Art(element));
        cacheMemory[page, limit, fields] = artArray;
        artArray.length = 20;
        console.log(' we got the art from the api');
        res.send(artArray);
      });
    }


  }
  catch (error) { console.log(error); }

}






class Art {
  constructor(data) {
    this.title = data.title;
    this.image = `https://www.artic.edu/iiif/2/${data.image_id}/full/843,/0/default.jpg`;


  }

}


module.exports = handleArt;

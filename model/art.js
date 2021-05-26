require('dotenv').config();
const superagent = require('superagent');

function handleArt(req, res) {
  try {
    const artUrl = `https://api.artic.edu/api/v1/artworks`;
    const limit = req.query.limit;
    const page = req.query.page;
    const fields = req.query.fields;

    const params = {

      page: page,
      limit: limit,
      fields: fields
    };

    superagent.get(artUrl).query(params).then(artDbData => {
      const artArray = artDbData.body.data.map(element => new Art(element));

      artArray.length = 20;
      res.send(artArray);
    });


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

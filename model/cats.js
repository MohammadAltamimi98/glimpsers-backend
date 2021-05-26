const catsData = require('../assets/catsData.json');

function cats(req, res) {
  const newCatsArray = catsData.map(data => new Cats(data));
  res.send(newCatsArray);
}

class Cats {

  constructor(data) {
    this.name = data.name;
    this.temperament = data.temperament;
    this.image = data.image.url;
    this.origin = data.origin;
    this.description = data.description;
    this.wikipedia_url = data.wikipedia_url;
  }

}

module.exports = cats;

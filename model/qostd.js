const qost = require('../assets/Qost.json');

function qosts(req, res) {

  const random = Number(getRndInteger(1,100));
  res.sent(qost[random]);
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

module.exports = qosts;

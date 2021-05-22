// requiring mongoose
const mongoose = require('mongoose');
// const parentSchema = require('./parentSchema');
const childSchema = require('./childSchema');



const allDataSchema = new mongoose.Schema({
  data: [{
    email: String,
    name: String,
    imageUrl: String,
    interest: { movie: Boolean, news: Boolean },
    posts: [{ childSchema }],
  }]
});

// creating schemas

// calling the model
const AllDataModel = mongoose.model('data', allDataSchema);



function filterData(req, res) {
  console.log(AllDataModel);
  const { email } = req.query;
  AllDataModel.find({ email: email }, function (err, ownerData) {
    if (err) { res.send('not found'); }
    else {
      res.send(ownerData);
    }

  });

  // res.send(getbooksByOwner())
}
// if (error === 'not found') {
//   const { email, name, imageUrl, movie, news } = req.body;
//   const newUser = new Schema.AllDataModel({
//     email: email,
//     name: name,
//     imageUrl: imageUrl,
//     interest: { movie: movie, news: news },
//     posts: [{}],
//   });
//   newUser.save();
// }
// const { email, name, imageUrl} = req.query;

//       const newUser = new allDataModel({
//         email: email,
//         name: name,
//         imageUrl: imageUrl,
//         interest: { movie: false, news: false },
//         posts: {},
//       });
//       res.send(newUser.save());

module.exports = { filterData, AllDataModel };

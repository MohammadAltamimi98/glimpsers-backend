require('dotenv').config();

const superagent = require('superagent');
const FOOD_APP_ID = process.env.FOOD_APP_ID;
const FOOD_APP_KEY = process.env.FOOD_APP_KEY;
const cacheMemory = require('../cache/cahceFoodMemory');

function handlefood(req, res) {

  try {
    const foodUrl = `https://api.edamam.com/search`;
    // const page,ingredients = req.query.query;
    // const ingredients = req.query.ingredients;
    const ingredients = req.query.q;


    const params = {
      app_id: FOOD_APP_ID,
      app_key: FOOD_APP_KEY,
      q: ingredients,
      // query: page,ingredients,


    };
    console.log(cacheMemory);



    if (cacheMemory[ingredients]) {
      console.log(' we got the food from the cache');

      res.status(200).send(cacheMemory[ingredients]);
    }

    else {
      superagent.get(foodUrl).query(params).then(foodDbData => {
        const foodArray = foodDbData.body.hits.map(recipe => new Food((recipe.recipe)));
        cacheMemory[ingredients] = foodArray;
        foodArray.length = 20; // to set the array response we get to only 12 foods.
        console.log(' we got the food from the api');
        res.send(foodArray);



      });
    }


  }
  catch (error) { console.log(error); }

}






class Food {
  constructor(recipe) {
    this.url = recipe.url;
    this.label = recipe.label;
    this.image_url = recipe.image;
    this.ingredients = recipe.ingredientLines;
    this.totalTime = recipe.totalTime;
  }

}


module.exports = handlefood;

var fs = require('fs');
var _ = require('lodash');
var request = require('request');
var Promise = require('bluebird');
var bcrypt = require('bcrypt');
var creds = {
  appId: "19dc5ef3",
  appKey: "1caac1145c265164258e31800a83e01c",
}
var Users = require('../models/users');
var Meals = require('../models/meals');
var Foods = require('../models/foods');
var _ = require('lodash');

Promise.promisifyAll(fs);
Promise.promisifyAll(Users);
Promise.promisifyAll(Meals);


module.exports.getSearchResponse = function(query, callback) {
  var nutritionUrl = 'http://api.nutritionix.com/v1_1/search/' + query;
  request({
    url: nutritionUrl,
    qs: Object.assign({}, creds, {results:"0:8"}),
  },
  function (error, response, body) {
    if(error) {
      callback(error, null);
    } else {
      callback(null, body);
    }
  });
};

module.exports.getFoodItem = function(id, callback) {
  Foods.find({'item_id':id})
  .then(function(foundFood) {
    if(foundFood.length !== 0) {
      console.log('found_food');
      callback(null, foundFood[0]['JSON_result']);
    } else {
      var nutritionUrl = 'http://api.nutritionix.com/v1_1/item';
      request({
        url: nutritionUrl,
        qs: Object.assign({}, creds, {id:id}),
      }, function(error, response, body) {
        if(error) {
          callback(error, null);
        } else {
          Foods.create({'item_id': id, 'JSON_result': body}, function(err, newFood) { //create new user if not found.
            if (newFood) {
              console.log('created food', newFood);
              callback( null, newFood['JSON_result']);
            } else {
              callback( err, null );
            }
          });
        }
      })
    }
  })
  .catch(function(err) {
    callback(err, null);
  });
};

module.exports.getFoodItemAsync = Promise.promisify(module.exports.getFoodItem);


module.exports.checkUser = function(username, password, callback) {
	Users.find({username:username}, function(err, foundUser){
		if(Array.isArray(foundUser) && foundUser.length !== 0){
      for(var i = 0; i < foundUser.length; i++){
        if (bcrypt.compareSync(password, foundUser[i].password)){
			     callback(null,foundUser);
           return;
        }
      }
      callback({message: 'password invalid'}, null);
		} else {
			callback(err, null);
		}
	});
};


module.exports.makeNewUser = function(username, password, callback) {
    Users.find({username:username}, function(err, foundUser){
        if(Array.isArray(foundUser) && foundUser.length !== 0){ //mongodb sends back an empty array if nothing is found.
            callback(null, foundUser);
        } else {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);
            Users.create({username:username, password:hash, salt:salt}, function(err, newUser){ //create new user if not found.
                if (newUser) {
                    callback( null, newUser );
                } else {
                    callback( err, null );
                }
            });
        }
    });
};

module.exports.makeNewMeal = function(meal, callback) {
    Meals.create(meal, function(err, newMeal){
        if (newMeal) {
            callback( null, newMeal );
        } else {
            callback( err, null );
        }
    });
};

module.exports.checkMealsByUser = function(username, callback) {
    Meals.find({eatenBy:username}, function(err, foundMeals){
        if (Array.isArray(foundMeals) && foundMeals.length !== 0) {
            callback( null, foundMeals );
        } else {
            callback( err, null );
        }
    });
};


module.exports.sendUserStateInfo = function(username, callback) {
    Promise.all([Users.findAsync({username:username}),
        Meals.findAsync({eatenBy:username})])
        .then(function(results){
            var mapIdsToFoods = {};
            results[1].forEach( function(meal) {
              _.keys(meal.foodsEaten).forEach( function(foodId, index) {
                mapIdsToFoods[foodId] = module.exports.getFoodItemAsync(foodId);
              });
            });
            Promise.props(mapIdsToFoods)
            .then(function(foodStrings) {
              console.log(foodStrings);
              var foods = _.mapValues(foodStrings, JSON.parse);
              var infoObj = {
                  userInfo: _.omit(results[0][0], ['password','salt']),
                  meals: results[1],
                  foods: foods
              };
              callback(null, infoObj);
            })
            .catch(function(err) {
              console.log('err querying for food');
              callback(err, null);
            });

        })
        .catch(function(err){
            callback(err, null);
        });
};




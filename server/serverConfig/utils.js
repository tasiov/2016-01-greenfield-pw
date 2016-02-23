var fs = require('fs');
var _ = require('lodash');
var request = require('request');
var Promise = require('bluebird');
var bcrypt = require('bcrypt');
var creds = {
  appId: "faf1bee4",
  appKey: "ee1bb6aa1dc012b58a06a7fd14ddbef1",
}
var Users = require('../models/users');
var Meals = require('../models/meals');
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
  var nutritionUrl = 'http://api.nutritionix.com/v1_1/item';
  request({
    url: nutritionUrl,
    qs: Object.assign({}, creds, {id:id}),
  },
  function(error, response, body) {
    if(error) {
      callback(error, null);
    } else {
      callback(null, body);
    }
  });
};

module.exports.getFoodItemAsync = Promise.promisify(module.exports.getFoodItem);


module.exports.checkUser = function(username, password, callback) {
	Users.find({username:username}, function(err, foundUser){
		if(Array.isArray(foundUser) && foundUser.length !== 0){
      for(var i = 0; i < foundUser.length; i++){
        console.log(bcrypt.compareSync(password, foundUser[i].password), bcrypt.hashSync(password, 10 ), foundUser[i].password)
        
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
              for (var id in meal.foods) {
                if(!(id in mapIdsToFoods)) {
                  mapIdsToFoods[id] = module.exports.getFoodItemAsync(id);
                }
              }
            });

            Promise.props(mapIdsToFoods)
            .then(function(foods) {
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




var fs = require('fs');
var request = require('request');
var Promise = require('bluebird');
Promise.promisifyAll(fs);
var Users = require('../models/users');
var creds = {
  appId: "faf1bee4", 
  appKey: "ee1bb6aa1dc012b58a06a7fd14ddbef1",
}
var Meals = require('../models/meals');

module.exports.checkUser = function(username, password, callback) {
	Users.find({username:username, password:password}, function(err, res){
		if(res){
			callback(null,res);
		} else {
			callback(err, null);
		}
	});
};

module.exports.makeNewUser = function(username, password, callback) {

    Users.find({username:username}, function(err, foundUser){
        if(foundUser){
            callback(null, "User Found"));
        } else {
            Users.create({username:username, password:password}, function(err, newUser){
                if(newUser){
                    callback(null,newUser);
                } else {
                    callback(err, null);
                }
            });
        }
    });
};

module.exports.sendUserStateInfo = function(username, password, callback) {
	var infoObj = {};

	Users.find({username:username}, function(err, res){
		if(res){
			infoObj.user = res;
			sendIfComplete();
		} else {
			callback( err, null);
		}
	});

	Meals.find({eatenBy:username}, function(err, res){
		if(res){
			infoObj.meals = res;
			sendIfComplete();
		} else {
			callback( err, null);
		}
	});

	var sendIfComplete = function(){
		if (infoObj.user && infoObj.meals){
			callback(infoObj,null);
		}
	}
	// console.log(__dirname + '/../data/sampleGet.json');
	// return fs.readFileAsync(__dirname + '/../data/sampleGet.json', 'utf8')
	// .then(function(data) {
	// 	var userObj = {user: 'test1', password: 'password'};
	// 	return userObj;
	// })
	// .catch(function(err) {
	// 	return {Error: err};
	// });
};

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

var fs = require('fs');
var request = require('request');
var Promise = require('bluebird');
Promise.promisifyAll(fs);

var creds = {
  appId: "faf1bee4", 
  appKey: "ee1bb6aa1dc012b58a06a7fd14ddbef1",
}

module.exports.checkUser = function(username, password, callback) {
	if(username === 'username' && password === 'password') {
		callback(null, true);
	}
};

module.exports.extractUserInfo = function(username, password, callback) {
	console.log(__dirname + '/../data/sampleGet.json');
	return fs.readFileAsync(__dirname + '/../data/sampleGet.json', 'utf8')
	.then(function(data) {
		var userObj = {user: 'test1', password: 'password'};
		return userObj;
	})
	.catch(function(err) {
		return {Error: err};
	});
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

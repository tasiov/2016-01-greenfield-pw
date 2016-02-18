var Promise = require('bluebird');
var fs = require('fs');
Promise.promisifyAll(fs);



module.exports.checkUser = function(username, password, callback) {
	if(username === 'username' && password === 'password') {
		callback(null, true);
	}
}

module.exports.extractUserInfo = function(username, password, callback) {
	return fs.readFileAsync(__dirname + '../data/sampleGet.json')
	.then(function(data) {
		var userObj = JSON.parse(data);
		return userObj;
	})
	.catch(function(err) {
		return {Error: 0};
	});
}
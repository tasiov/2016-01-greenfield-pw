var Promise = require('bluebird');
var fs = require('fs');
Promise.promisifyAll(fs);



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

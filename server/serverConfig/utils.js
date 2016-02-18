
module.exports.checkUser = function(username, password, callback) {
	if(username === 'username' && password === 'password') {
		callback(null, true);
	}
}

module.exports.extractUserInfo = function(username, password, callback) {
	callback(null, 'Info on user');

}
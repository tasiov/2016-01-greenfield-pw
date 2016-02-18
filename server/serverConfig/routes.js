var fs = require('fs');
var Promise = require('bluebird');
Promise.promisifyAll(fs);


module.exports = function(app, express) {
  //making a get request to the index must render the index.ejs file with the appopriate prompt,
  //and code template. Getting the files from room1 and then injecting them into the ejs template
  //as a data object ensure they are rendered properly
	app.get('/', function(req, res) {
		res.redirect('/index.html');
	});

}

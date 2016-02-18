var fs = require('fs');
var Promise = require('bluebird');
var utils = require('./utils.js');
Promise.promisifyAll(fs);
Promise.promisifyAll(utils);


module.exports = function(app, express) {
	app.post('/login', function(req, res) {
		util.checkUserAsync(req.body.username, req.body.password)
		.then(function(result) {
			if(result) {
				req.session.regenerate(function() {
					req.session.user = req.body.username;
					res.send('You passed');
				})
			} else {
				return res.send('Invalid Password');
			}
		})
		.catch(function(err) {
			res.send('error ' + err);
		})
	});


	app.get('/', function(req, res) {
		res.redirect('/index.html');
	});


	app.get('/login', function(req, res) {
		if(req.session) {
			util.extractUserInfoAsync(req)
			.then(function(info) {
				res.send(info);
			});
		} else {
			res.send('Not logged in');
		}
	});
}

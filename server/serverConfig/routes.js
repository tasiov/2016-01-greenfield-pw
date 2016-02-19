var Promise = require('bluebird');
var utils = require('./utils.js');
Promise.promisifyAll(utils);


module.exports = function(app, express) {
	app.post('/login', function(req, res) {
		utils.checkUserAsync(req.body.username, req.body.password)
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
		console.log(req.session);
		if(req.session.user) {
			utils.extractUserInfo(req)
			.then(function(infoObj) {
				res.send(infoObj);
			});
		} else {
			res.send('Not logged in');
		}
	});

	app.post('/search', function(req, res) {
		if (!req.body.query) return res.send('Invalid query');
		var query = req.body.query.trim();
		utils.getSearchResponseAsync(query)
		.then(function(result) {
			res.send(result);
		})
		.catch(function(err) {
			res.send('error ' + err);
		});
	});
}

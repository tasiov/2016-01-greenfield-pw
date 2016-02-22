var Promise = require('bluebird');
var utils = require('./utils.js');
Promise.promisifyAll(utils);


module.exports = function(app, express) {
	app.post('/login', function(req, res) {
		utils.checkUserAsync(req.body.username, req.body.password)
		.then(function(result) {
			req.session.regenerate(function() {
				req.session.user = req.body.username;
				utils.sendUserStateInfoAsync(req.body.username)
				.then(function(userObj) {
					res.send(userObj);
				});
			})
		})
		.catch(function(err) {
			res.send('error ' + err);
		})
	});


	app.get('/', function(req, res) {
		res.redirect('/index.html');
	});

	app.post('/signup', function(req, res) {
	    utils.makeNewUserAsync(req.body.username, req.body.password)
	    .then(function(result) {
	        req.session.regenerate(function() {
	            req.session.user = req.body.username;
	            utils.sendUserStateInfoAsync(req.body.username)
	            .then(function(infoObj) {
	            	res.send(infoObj);
	            });
	        })
	    })
	    .catch(function(err) {
	        res.send('error ' + err);
	    })
	});

	app.get('/login', function(req, res) {
		if(req.session.user) {
			utils.sendUserStateInfoAsync(req.session.user)
			.then(function(infoObj) {
				res.send(infoObj);
			});
		} else {
			res.send('Invalid User');
		}
	});

	app.get('/logout', function(req, res) {
		if(req.session.user) {
			req.session.destroy();
		} else {
			res.send('You have been logged out. See you next time!');
		}
	});

	app.post('/meals', function(req, res) {
	    var newMeal = req.body.meal;
	    if (typeof req.body.meal === 'string') {
	    	newMeal = JSON.parse(req.body.meal)
	    }
	    utils.makeNewMealAsync(newMeal)
	    .then(function(newMeal) {
				res.send(newMeal);
	    })
	    .catch(function(err) {
	        res.send('error ' + err);
	    })
	});

	app.get('/meals', function(req, res) {
		if(req.session.user) {
			utils.checkMealsByUserAsync(req.session.username)
			.then(function(meals) {
				res.send(meals);
			});
		} else {
			res.send('Please Log in to check meals.');
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

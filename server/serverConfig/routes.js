var Promise = require('bluebird');
var utils = require('./utils.js');
Promise.promisifyAll(utils);


module.exports = function(app, express) {
	app.post('/login', function(req, res) {
		utils.checkUserAsync(req.body.username, req.body.password)
		.then(function(result) {
			console.log("result", result);
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

	app.post('/signup', function(req, res) {
	    console.log('post: ', req.body.username, req.body.password);
	    utils.makeNewUserAsync(req.body.username, req.body.password)
	    .then(function(result) {
	        req.session.regenerate(function() {
	            req.session.user = req.body.username;
	            res.send(result);
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

	app.post('/meals', function(req, res) {
	    console.log('post: ', req.body.meal);
	    var newMeal = req.body.meal;
	    if (typeof req.body.meal === 'string') {
	    	newMeal = JSON.parse(req.body.meal)
	    }
	    console.log('new meal is ' + newMeal + ' and type is ' + typeof newMeal);
	    utils.makeNewMealAsync(newMeal)
	    .then(function(newMeal) {
			res.send(newMeal);
	    })
	    .catch(function(err) {
	        res.send('error ' + err);
	    })
	});

	app.get('/meals', function(req, res) {
		console.log(req.session);
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

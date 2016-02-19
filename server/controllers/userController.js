var User = require('../models/users.js');

// Create our necessary controller methods to perform all needed CRUD actions

exports.createOne = function(req, res) {
    var newUser = req.body;
    User.create(newUser, function(err,createdUser){
        if(err){
            return res.json(err);
        }
        res.json(createdUser);
    });
};

exports.retrieve = function(req, res) {
    User.find({},function(err,Users){
        if(err){
            return res.json(err);
        }
        res.json(Users);
    });
};

exports.retrieveOne = function( req, res) {
    var params = req.params;
    User.find(params, function(req, User){
        if(err){
            return res.json(err);
        }
        res.json(User);
    });
};

exports.createMany = function(req, res) {
    var newUser = req.body;
    User.create(newUser, function(err,created){
        if(err){
            return res.json(err);
        }
        res.json(created);
    });
};

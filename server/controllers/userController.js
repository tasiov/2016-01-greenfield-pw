var User = require('../models/users.js');

// Create our necessary controller methods to perform all needed CRUD actions

exports.create = function(req, res) {
    var newUser = req.body;
    User.create(newUser, function(err,createdUser){
        if(err){
            return res.json(err);
        }
        res.json(createdUser);
    });
};


exports.retrieve = function( req, res) {
    var params = req.params;
    User.find(params, function(req, User){
        if(err){
            return res.json(err);
        }
        res.json(User);
    });
};


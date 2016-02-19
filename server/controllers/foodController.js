
// var Food = require('../models/Foods.js');

// // Create our necessary controller methods to perform all needed CRUD actions

// exports.createOne = function(req, res) {
//     var newFood = req.body;
//     Food.create(newFood, function(err,createdFood){
//         if(err){
//             return res.json(err);
//         }
//         res.json(createdFood);
//     });
// };

// exports.retrieve = function(req, res) {
//     Food.find({},function(err,Foods){
//         if(err){
//             return res.json(err);
//         }
//         res.json(Foods);
//     });
// };

// exports.retrieveOne = function( req, res) {
//     var params = req.params;
//     Food.find(params, function(req, Food){
//         if(err){
//             return res.json(err);
//         }
//         res.json(Food);
//     });
// };

// exports.createMany = function(req, res) {
//     var newFood = req.body;
//     Food.create(newFood, function(err,created){
//         if(err){
//             return res.json(err);
//         }
//         res.json(created);
//     });
// };

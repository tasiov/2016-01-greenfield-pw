// var Meal = require('../models/meals.js');

// // Create our necessary controller methods to perform all needed CRUD actions

// exports.createOne = function(req, res) {
//     var newMeal = req.body;
//     Meal.create(newMeal, function(err,createdMeal){
//         if(err){
//             return res.json(err);
//         }
//         res.json(createdMeal);
//     });
// };

// exports.retrieve = function(req, res) {
//     Meal.find({},function(err,Meals){
//         if(err){
//             return res.json(err);
//         }
//         res.json(Meals);
//     });
// };

// exports.retrieveOne = function( req, res) {
//     var params = req.params;
//     Meal.find(params, function(req, Meal){
//         if(err){
//             return res.json(err);
//         }
//         res.json(Meal);
//     });
// };

// exports.createMany = function(req, res) {
//     var newMeal = req.body;
//     Meal.create(newMeal, function(err,created){
//         if(err){
//             return res.json(err);
//         }
//         res.json(created);
//     });
// };

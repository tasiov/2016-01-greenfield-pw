var mongoose = require('mongoose');

var mealSchema = mongoose.Schema({
    eatenAt: {type: 'Date'},
    eatenBy: {type: 'String'},
    food: {type: ['String']},
}); 

var Meal = mongoose.model('Meal',mealSchema);

module.exports = Meal;
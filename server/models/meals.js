var mongoose = require('mongoose');

var mealSchema = mongoose.Schema({
    eatenAt: {type: 'Date'},
    eatenBy: {type: 'String'},
    foods: {type: 'Mixed'},
}); 

var Meal = mongoose.model('Meal',mealSchema);

module.exports = Meal;
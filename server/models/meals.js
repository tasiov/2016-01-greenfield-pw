var mongoose = require('mongoose');

var mealSchema = mongoose.Schema({
    eatenAt: {type: 'Date'},
    eatenBy: {type: 'String'},
    foodsEaten: {type: 'Mixed'},
}); 

var Meal = mongoose.model('Meal',mealSchema);

module.exports = Meal;


// 513fceb475b8dbbc21000f94

// {
//  'eatenAt': '2014-01-01T23:28:56.782Z',
//  'eatenBy':'orlando', 
//  'foods': {
//  	'513fceb475b8dbbc21000f94' : 1 
//  } 
// }
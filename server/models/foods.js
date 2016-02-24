var mongoose = require('mongoose');

var foodSchema = mongoose.Schema({
 item_id: {type:'String'},
 JSON_result: {type: 'String'}
}); 

var Food = mongoose.model('Food',foodSchema);

module.exports = Food;
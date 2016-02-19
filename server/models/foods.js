var mongoose = require('mongoose');

var foodSchema = mongoose.Schema({
 old_api_id: {type:'String'},
 item_id: {type:'String'},
 item_name: {type:'String'},
 leg_loc_id: {type:'Number'},
 brand_id: {type:'String'},
 brand_name: {type:'String'},
 item_description: {type:'String'},
 updated_at: {type:'Date'},
 nf_ingredient_statement: {type:'String'},
 nf_water_grams: {type:'Number'},
 nf_calories: {type:'Number'},
 nf_calories_from_fat: {type:'Number'},
 nf_total_fat: {type:'Number'},
 nf_saturated_fat: {type:'Number'},
 nf_trans_fatty_acid: {type:'Number'},
 nf_polyunsaturated_fat: {type:'Number'},
 nf_monounsaturated_fat: {type:'Number'},
 nf_cholesterol: {type:'Number'},
 nf_sodium: {type:'Number'},
 nf_total_carbohydrate: {type:'Number'},
 nf_dietary_fiber: {type:'Number'},
 nf_sugars: {type:'Number'},
 nf_protein: {type:'Number'},
 nf_vitamin_a_dv: {type:'Number'},
 nf_vitamin_c_dv: {type:'Number'},
 nf_calcium_dv: {type:'Number'},
 nf_iron_dv: {type:'Number'},
 nf_refuse_pct: {type:'Number'},
 nf_servings_per_container: {type:'Number'},
 nf_serving_size_qty: {type:'Number'},
 nf_serving_size_unit: {type:'String'},
 nf_serving_weight_grams: {type:'Number'},
 allergen_contains_milk: {type:'Boolean'},
 allergen_contains_eggs: {type:'Boolean'},
 allergen_contains_fish: {type:'Boolean'},
 allergen_contains_shellfish: {type:'Boolean'},
 allergen_contains_tree_nuts: {type:'Boolean'},
 allergen_contains_peanuts: {type:'Boolean'},
 allergen_contains_wheat: {type:'Boolean'},
 allergen_contains_soybeans: {type:'Boolean'},
 allergen_contains_gluten: {type:'Boolean'},
 usda_fields: {type:'String'},
}); 

var Food = mongoose.model('Food',foodSchema);

module.exports = Food;
import React from 'react';
import { connect } from 'react-redux';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';

//Function
export const getNutritionInfo = (meals, foods, additionals) => {
	let start = {
		nf_calories: 0,
		nf_protein: 0,
		nf_total_carbohydrate: 0,
		nf_total_fat: 0
	}

	//optional additional nutritional info, must be array
	if(additionals && Array.isArray(additionals)) {
		additionals.forEach(val => start[val] = 0);
	}

	const mergeFunc = (objVal, srcVal) => (objVal || 0) + (srcVal || 0);
	return meals.reduce((mealSum, meal) => {
		let currMeal = _.transform(meal.foodsEaten, (foodSum, timesEaten, foodId) => {
			let foodNFstats = _.pick(foods[foodId], Object.keys(foodSum));
			let foodNFtotals = _.mapValues(foodNFstats, val => timesEaten * val || 0);
			 _.mergeWith(foodSum, foodNFtotals, mergeFunc);
		}, Object.assign({}, start));
		return _.mapValues(currMeal, (sum, key) => currMeal[key] + mealSum[key]);
	}, Object.assign({}, start));
}

//React Component
export const NutritionCounter = ({meals,foods}) => {
	let NF = getNutritionInfo(meals, foods);	
	NF = _.mapValues(NF, (num) => num.toFixed(2));
	return (
			<TableRow>
				<TableHeaderColumn>
					<h4>Total Calories: {NF['nf_calories']} cal</h4>
				</TableHeaderColumn>
				<TableHeaderColumn>
				</TableHeaderColumn>
				<TableHeaderColumn>
					<h4>Total Protein: {NF['nf_protein']}g</h4>
				</TableHeaderColumn>
				<TableHeaderColumn>
					<h4>Total Carbs: {NF['nf_total_carbohydrate']}g</h4>
				</TableHeaderColumn>
				<TableHeaderColumn>
					<h4>Total Fat: {NF['nf_total_fat']}g</h4>
				</TableHeaderColumn>
			</TableRow>
		);
}


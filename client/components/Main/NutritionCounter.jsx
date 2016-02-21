import React from 'react';
import { connect } from 'react-redux';

const NutritionCounter = ({meals,foods}) => {
	const start = {
		nf_calories: 0,
		nf_protein: 0,
		nf_total_carbohydrate: 0,
		nf_total_fat: 0
	}

	const mergeFunc = (prev, val) => (prev || 0) + (next || 0);
	
	let NF = meals.reduce((mealSum, meal) => {
		let currMeal = _.transform(meal.foods, (foodSum, foodId, timesEaten) => {
			let foodNFstats = _.pick(foods[id], Object.keys(start));
			let foodNFtotals = _.mapValues(foodNFstats, val => timesEaten * val || 0);
			return _.mergeWith({}, foodNFtotals, foodSum, mergeFunc);
		}, start);
		return _.mergeWith({}, currMeal, mealSum, mergeFunc);
	}, start);

	return (
			<div className='nutrition-info'>
				<span className='nutrition-info-calories'>Calories: {NF['nf_calories']}</span>
				<span className='nutrition-info-protein'>Protein: {NF['nf_protein']}</span>
				<span className='nutrition-info-carbs'>Carbs: {NF['nf_total_carbohydrate']}</span>
				<span className='nutrition-info-fat'>Fat: {NF['nf_total_fat']}</span>
			</div>
		);
}

export default NutritionCounter
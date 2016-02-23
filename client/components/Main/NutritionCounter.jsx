import React from 'react';
import { connect } from 'react-redux';

const NutritionCounter = ({meals,foods}) => {
	console.log(Array.isArray(meals));
	console.log('meals in NF', meals);
	let start = {
		nf_calories: 0,
		nf_protein: 0,
		nf_total_carbohydrate: 0,
		nf_total_fat: 0
	}

	const mergeFunc = (dest, source1, source2) => (dest || 0) + (source1 || 0) + (source2 || 0);
	window.mergeFunc = mergeFunc;
	let NF = meals.reduce((mealSum, meal) => {
		let currMeal = _.transform(meal.foodsEaten, (foodSum, timesEaten, foodId) => {
			let foodNFstats = _.pick(foods[foodId], Object.keys(start));
			let foodNFtotals = _.mapValues(foodNFstats, val => timesEaten * val || 0);
			console.log('totals are', foodNFtotals);
			console.log('foodSum is', foodSum);
			return _.mapValues(foodNFtotals, (sum, key) => foodNFtotals[key] + foodSum[key]);
		}, start);
		console.log('currMeal is', currMeal);
		return _.mapValues(currMeal, (sum, key) => currMeal[key] + mealSum[key]);
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
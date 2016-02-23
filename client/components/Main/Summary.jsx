import React from 'react';
import {getNutritionInfo} from './NutritionCounter.jsx';

const Summary = ({user}) => {
	let NFsum = getNutritionInfo(user.meals, user.foods);
	let dateDiffMilli = new Date(user.meals[user.meals.length - 1].eatenAt) - new Date(user.meals[0].eatenAt);
	let dateDiffDays =  dateDiffMilli / (24*60*60*1000);
	let NFdailyAvg = _.mapValues(NFsum, (sum) => (sum/dateDiffDays));
	let gramAvgSum = NFdailyAvg['nf_protein'] + NFdailyAvg['nf_total_carbohydrate'] + NFdailyAvg['nf_total_fat'];
	let NFpercAvgMass = _.mapValues(NFdailyAvg, (gramAvg) => (gramAvg/gramAvgSum));
	delete NFpercAvgMass['nf_calories'];




	delete NFpercAvgMass['nf_calories'] //calories is not used in gram mass, so deleted after above calculation
	return (
			<div className = 'summary'>
				<p>Daily Number of Calories: {NFdailyAvg['nf_calories']}</p>
				<p>Daily Grams of Protein: {NFdailyAvg['nf_protein']}</p>
				<p>Daily Grams of Carbs: {NFdailyAvg['nf_total_carbohydrate']}</p>
				<p>Daily Grams of Fat: {NFdailyAvg['nf_total_fat']}</p>
				<p>% Daily Average of Protein: {NFpercAvgMass['nf_protein']}</p>
				<p>% Daily Average of Carbs: {NFpercAvgMass['nf_total_carbohydrate']}</p>
				<p>% Daily Average of Fat: {NFpercAvgMass['nf_total_fat']}</p>
			</div>
		);
}

export default Summary;

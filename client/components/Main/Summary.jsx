import React from 'react';
import {getNutritionInfo} from './NutritionCounter.jsx';

const Summary = ({user}) => {
	if(Array.isArray(user.meals) && user.meals.length !== 0) {
		let NFsum = getNutritionInfo(user.meals, user.foods);
		let dateDiffMilli = new Date(user.meals[user.meals.length - 1].eatenAt) - new Date(user.meals[0].eatenAt);
		let dateDiffDays =  dateDiffMilli / (24*60*60*1000);
		let NFdailyAvg = _.mapValues(NFsum, (sum) => (sum/dateDiffDays));
		let gramAvgSum = NFdailyAvg['nf_protein'] + NFdailyAvg['nf_total_carbohydrate'] + NFdailyAvg['nf_total_fat'];
		let NFpercAvgMass = _.mapValues(NFdailyAvg, (gramAvg) => (gramAvg/gramAvgSum*100));
		delete NFpercAvgMass['nf_calories'];

		let currMeals = user.meals.filter((meal) => {
			let mealDate = new Date(meal.eatenAt);
			let currDate = new Date(Date.now());
			let dateFunctions = ['getDate', 'getMonth', 'getFullYear'];
			return dateFunctions.reduce( (prev, func) => prev && mealDate[func]() && currDate[func](), true);
		});
		let currDaySum = getNutritionInfo(currMeals, user.foods);
		let currDayGramSum = currDaySum['nf_protein'] + currDaySum['nf_total_carbohydrate'] + currDaySum['nf_total_fat'];
		let currDayPerc = _.mapValues(currDaySum, (gramAvg) => (gramAvg/currDayGramSum*100));
		delete currDayPerc['nf_calories'];
		return (
				<div className = 'summary'>
					<p>Daily Number of Calories: {NFdailyAvg['nf_calories']}</p>
					<p>Daily Grams of Protein: {NFdailyAvg['nf_protein']}</p>
					<p>Daily Grams of Carbs: {NFdailyAvg['nf_total_carbohydrate']}</p>
					<p>Daily Grams of Fat: {NFdailyAvg['nf_total_fat']}</p>
					<p>% Daily Average of Protein: {NFpercAvgMass['nf_protein']}</p>
					<p>% Daily Average of Carbs: {NFpercAvgMass['nf_total_carbohydrate']}</p>
					<p>% Daily Average of Fat: {NFpercAvgMass['nf_total_fat']}</p>
					<br></br>
					<p>Current Day % of Protein: {currDayPerc['nf_protein']}</p>
					<p>Current Day % of Carbs: {currDayPerc['nf_total_carbohydrate']}</p>
					<p>Current Day % of Fat: {currDayPerc['nf_total_fat']}</p>
				</div>
			);

	} else {
		return (<p>User has not logged any info yet</p>);
	}
}

export default Summary;

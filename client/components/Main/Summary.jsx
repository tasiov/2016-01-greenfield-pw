import React from 'react';
import {getNutritionInfo} from './NutritionCounter.jsx';
import MacroPieChart from './MacroPieChart.jsx';

const Summary = ({user}) => {
	if(Array.isArray(user.meals) && user.meals.length !== 0) {

		let dateFunctions = ['getDate', 'getMonth', 'getFullYear'];

		let mealsByDate = _.transform(user.meals,(result, meal) => {
			let mealDate = new Date(meal.eatenAt);
			let dateString = dateFunctions.map(func => mealDate[func]()).join('-');
			result[dateString] = result[dateString] || [];
			result[dateString].push(meal);
		}, {});
		let nutrByDate = _.mapValues(mealsByDate, mealsArr => getNutritionInfo(mealsArr, user.foods));

		let NFdailyAvg = _.values(nutrByDate).reduce( (prev, nutrObj, index) => {
			return _.mergeWith(prev, nutrObj, (prevV, nutrV) => ((prevV || 0)*(index) + (nutrV || 0))/(index + 1));
		});
		let gramAvgSum = NFdailyAvg['nf_protein'] + NFdailyAvg['nf_total_carbohydrate'] + NFdailyAvg['nf_total_fat'];
		let NFpercAvgMass = _.mapValues(NFdailyAvg, (gramAvg) => (gramAvg/gramAvgSum*100));
		delete NFpercAvgMass['nf_calories'];

		let currDaySum = nutrByDate[dateFunctions.map(func => (new Date())[func]()).join('-')];
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
					<MacroPieChart macroPercents={NFpercAvgMass} />	
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

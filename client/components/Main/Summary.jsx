import React from 'react';
import {getNutritionInfo} from './NutritionCounter.jsx';
import MacroPieChart from './MacroPieChart.jsx';
import ProgressBar from './ProgressBar.jsx';

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
			return _.mergeWith({}, prev, nutrObj, (prevV, nutrV) => ((prevV || 0)*(index) + (nutrV || 0))/(index + 1));
		});

		let currDaySum = nutrByDate[dateFunctions.map(func => (new Date())[func]()).join('-')] || getNutritionInfo([]);
		let currDayGramSum = currDaySum['nf_protein'] + currDaySum['nf_total_carbohydrate'] + currDaySum['nf_total_fat'];
		let currDayPerc = _.mapValues(currDaySum, (gramAvg) => (gramAvg/currDayGramSum*100));
		delete currDayPerc['nf_calories'];

		return (
				<div className = 'summary'>
					<p>Calories Consumed Today: {currDaySum['nf_calories']} </p>
					<p>Protein Consumed Today: {currDaySum['nf_total_fat']} g</p>
					<p>Carbohydrates Consumed Today: {currDaySum['nf_total_carbohydrate']} g</p>
					<p>Fat Consumed Today: {currDaySum['nf_protein']} g</p>
					<MacroPieChart macroPercents={currDayPerc} />	
					<br></br>
					<p>Daily Calorie consumption: {NFdailyAvg['nf_calories']}</p>
					<p>Daily Protein consumption: {NFdailyAvg['nf_protein']} g</p>
					<p>Daily Carbohydrate Consumption: {NFdailyAvg['nf_total_carbohydrate']} g</p>
					<p>Daily Fat Consumption: {NFdailyAvg['nf_total_fat']} g</p>
					<ProgressBar datedNutr={nutrByDate} />
				</div>
			);

	} else {
		return (<p>User has not logged any info yet</p>);
	}
}

export default Summary;

import React from 'react';
import {getNutritionInfo} from './NutritionCounter.jsx';
import {Pie} from 'react-chartjs';

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

		// let NFsum = getNutritionInfo(user.meals, user.foods);
		// let dateDiffMilli = new Date(Date.now()) - new Date(user.meals[0].eatenAt);
		// let dateDiffDays =  Math.ceil(dateDiffMilli / (24*60*60*1000));
		// let NFdailyAvg = _.mapValues(NFsum, (sum) => (sum/dateDiffDays));
		let gramAvgSum = NFdailyAvg['nf_protein'] + NFdailyAvg['nf_total_carbohydrate'] + NFdailyAvg['nf_total_fat'];
		let NFpercAvgMass = _.mapValues(NFdailyAvg, (gramAvg) => (gramAvg/gramAvgSum*100));
		delete NFpercAvgMass['nf_calories'];

		let currMeals = mealsByDate[dateFunctions.map(func => (new Date())[func]()).join('-')];
		let currDaySum = getNutritionInfo(currMeals, user.foods);
		let currDayGramSum = currDaySum['nf_protein'] + currDaySum['nf_total_carbohydrate'] + currDaySum['nf_total_fat'];
		let currDayPerc = _.mapValues(currDaySum, (gramAvg) => (gramAvg/currDayGramSum*100));
		delete currDayPerc['nf_calories'];

		let pieChartData = [
			{ 
				value: currDayPerc['nf_protein'],
				color: '#F7464A',
				highlight: '#FF545E',
				label: 'Protein %'
			}, {
				value: currDayPerc['nf_total_carbohydrate'],
				color: '#46BFBD',
				highlight: '#5Ad3D1',
				label: 'Carbs %'
			}, {
				value: currDayPerc['nf_total_fat'],
				color: '#FDB45C',
				highlight: '#FFC870',
				label: 'Fat %'
			}];

		let pieChartOptions = {
				segmentShowStroke: true,
				segmentStrokeColor: '#fff',
				segmentStrokeWidth: 2,
				animationSteps: 100,
				animationEasing: 'easeOutBounce',
				legendTemplate: '<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'
		};
		let pieChartLegend = (<ul>Current Day's Macronutrients
													{pieChartData.map(data => <li><span style={{backgroundColor: data.color}}></span>{data.label}</li>)}
												</ul>
												);


		return (
				<div className = 'summary'>
					<p>Daily Number of Calories: {NFdailyAvg['nf_calories']}</p>
					<p>Daily Grams of Protein: {NFdailyAvg['nf_protein']}</p>
					<p>Daily Grams of Carbs: {NFdailyAvg['nf_total_carbohydrate']}</p>
					<p>Daily Grams of Fat: {NFdailyAvg['nf_total_fat']}</p>
					<p>% Daily Average of Protein: {NFpercAvgMass['nf_protein']}</p>
					<p>% Daily Average of Carbs: {NFpercAvgMass['nf_total_carbohydrate']}</p>
					<p>% Daily Average of Fat: {NFpercAvgMass['nf_total_fat']}</p>
					<Pie data={pieChartData} options={pieChartOptions}/>
					{pieChartLegend}
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

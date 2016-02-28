import React from 'react';
import {getNutritionInfo} from './NutritionCounter.jsx';
import MacroPieChart from './MacroPieChart.jsx';
import ProgressBar from './ProgressBar.jsx';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';

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
					<List subheader="Today's Nutrition Info">
						<ListItem primaryText="Calories Consumed Today:" secondaryText= {currDaySum['nf_calories']} />
						<Divider insert={true} />
						<ListItem primaryText = 'Protein Consumed Today:' secondaryText={currDaySum['nf_total_fat']} g />
						<Divider insert={true} />
						<ListItem primaryText = 'Carbohydrates Consumed Today:' secondaryText={currDaySum['nf_total_carbohydrate']} g />
						<Divider insert={true} />
						<ListItem primaryText = 'Fat Consumed Today:' secondaryText={currDaySum['nf_protein']} g />
						<Divider insert={true} />
					</List>
					<MacroPieChart macroPercents={currDayPerc} />	
					<br></br>
					<List subheader="Daily Nutrition Averages">
						<ListItem primaryText="Daily Calorie consumption:" secondaryText= {NFdailyAvg['nf_calories']}/>
						<Divider insert={true} />
						<ListItem primaryText="Daily Protein consumption:" secondaryText= {NFdailyAvg['nf_protein']} />
						<Divider insert={true} />
						<ListItem primaryText="Daily Carbohydrate Consumption:" secondaryText= {NFdailyAvg['nf_total_carbohydrate']}/>
						<Divider insert={true} />
						<ListItem primaryText="Daily Fat Consumption:" secondaryText= {NFdailyAvg['nf_total_fat']}/>
					<ProgressBar datedNutr={nutrByDate} />
					</List>
				</div>
			);

	} else {
		return (<p>User has not logged any info yet</p>);
	}
}

export default Summary;

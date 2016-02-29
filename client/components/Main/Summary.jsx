import React from 'react';
import {getNutritionInfo} from './NutritionCounter.jsx';
import MacroPieChart from './MacroPieChart.jsx';
import ProgressBarContainer from '../../containers/ProgressBarContainer.jsx';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';

const Summary = ({user}) => {
	if(Array.isArray(user.meals) && user.meals.length !== 0) {
		let additionalFields = ['nf_calcium_dv', 'nf_calories_from_fat', 'nf_cholesterol',
														'nf_dietary_fiber','nf_iron','nf_monounsaturated_fat', 
														'nf_polyunsaturated_fat', 'nf_saturated_fat', 'nf_sodium',
														'nf_sugars', 'nf_trans_fatty_acid', 'nf_vitamain_a_dv',
														'nf_vitamin_cdv'];
		let dateFunctions = ['getDate', 'getMonth', 'getFullYear'];
		let mealsByDate = _.transform(user.meals,(result, meal) => {
			let mealDate = new Date(meal.eatenAt);
			let dateString = dateFunctions.map(func => mealDate[func]()).join('-');
			result[dateString] = result[dateString] || [];
			result[dateString].push(meal);
		}, {});
		let nutrByDate = _.mapValues(mealsByDate, mealsArr => getNutritionInfo(mealsArr, user.foods, additionalFields));

		let NFdailyAvg = _.values(nutrByDate).reduce( (prev, nutrObj, index) => {
			return _.mergeWith({}, prev, nutrObj, (prevV, nutrV) => ((prevV || 0)*(index) + (nutrV || 0))/(index + 1));
		});

		let currDaySum = nutrByDate[dateFunctions.map(func => (new Date())[func]()).join('-')] || getNutritionInfo([]);
		let currDayGramSum = currDaySum['nf_protein'] + currDaySum['nf_total_carbohydrate'] + currDaySum['nf_total_fat'];
		let currDayPerc = _.mapValues(currDaySum, (gramAvg) => (gramAvg/currDayGramSum*100));

		return (
				<div className = 'summary'>
					<div className = 'current-day-summary'>
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
						<Divider insert={true} />
						</div>
						<br></br>
						<div className = 'nutr-average-summary'>
						<List subheader="Daily Nutrition Averages">
							<ListItem primaryText="Daily Calorie consumption:" secondaryText= {NFdailyAvg['nf_calories']}/>
							<Divider insert={true} />
							<ListItem primaryText="Daily Protein consumption:" secondaryText= {NFdailyAvg['nf_protein']} />
							<Divider insert={true} />
							<ListItem primaryText="Daily Carbohydrate Consumption:" secondaryText= {NFdailyAvg['nf_total_carbohydrate']}/>
							<Divider insert={true} />
							<ListItem primaryText="Daily Fat Consumption:" secondaryText= {NFdailyAvg['nf_total_fat']}/>
							<Divider insert={true} />
						<ProgressBarContainer datedNutr={nutrByDate} />
						</List>
					</div>
				</div>
			);

	} else {
		return (<p>User has not logged any info yet</p>);
	}
}

export default Summary;

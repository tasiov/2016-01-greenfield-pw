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
														'nf_vitamin_c_dv'];
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

		currDaySum = _.mapValues(currDaySum, (num) => num.toFixed(1));
		NFdailyAvg = _.mapValues(NFdailyAvg, (num) => num.toFixed(1));

		return (
				<div className = 'summary'>
					<div className = 'current-day-summary'>
					<List subheader="Today's Nutrition Info">
						<ListItem primaryText= {"Calories Consumed Today: " + currDaySum['nf_calories']} />
						<Divider insert={true} />
						<ListItem primaryText={'Protein Consumed Today: ' + currDaySum['nf_protein'] + 'g'} />
						<Divider insert={true} />
						<ListItem primaryText={'Carbohydrates Consumed Today: ' + currDaySum['nf_total_carbohydrate'] + 'g'} 
											secondaryText={'Fiber consumed: ' + currDaySum['nf_dietary_fiber'] + 'g, ' +
																		 'Sugars consumed: ' + currDaySum['nf_sugars'] + 'g'} />
						<Divider insert={true} />
						<ListItem primaryText={'Fat Consumed Today: ' + currDaySum['nf_total_fat'] + 'g'} 
											secondaryText={'Saturated Fat Consumed: ' + currDaySum['nf_saturated_fat'] + 'g, ' + 
																		 'Polyunsaturated Fat Consumed: ' + currDaySum['nf_polyunsaturated_fat'] + 'g, ' + 
																		 'Monounsaturated Fat Consumed: ' + currDaySum['nf_monounsaturated_fat'] + 'g, ' + 
																		 'Trans Fat consumed: ' + currDaySum['nf_trans_fatty_acid'] + 'g'} />
						<Divider insert={true} />
						<ListItem primaryText={'Cholesterol Consumed Today: ' + currDaySum['nf_cholesterol'] + 'mg'} />
						<Divider insert={true} />
						<ListItem primaryText={'Sodium Consumed Today: ' + currDaySum['nf_sodium'] + 'mg'} />
						<Divider insert={true} />
						<ListItem primaryText={'Vitamin A Consumed Today: ' + currDaySum['nf_vitamain_a_dv'] + '% DV'} />
						<Divider insert={true} />
						<ListItem primaryText={'Vitamin C Consumed Today: ' + currDaySum['nf_vitamin_c_dv'] + '% DV'} />
						<Divider insert={true} />
						<ListItem primaryText={'Calcium Consumed Today: ' + currDaySum['nf_calcium_dv'] + '% DV'} />
						<Divider insert={true} />
						<ListItem primaryText={'Iron Consumed Today: ' + currDaySum['nf_iron'] + '% DV'} />
						<Divider insert={true} />
					</List>
					<MacroPieChart macroPercents={currDayPerc} />	
					<Divider insert={true} />
					</div>
					<br></br>
					<div className = 'nutr-average-summary'>
					<List subheader="Daily Nutrition Averages">
						<ListItem primaryText= {"Daily Caloric Consumption: " + NFdailyAvg['nf_calories']} />
						<Divider insert={true} />
						<ListItem primaryText={'Daily Protein Consumption: ' + NFdailyAvg['nf_protein'] + 'g'} />
						<Divider insert={true} />
						<ListItem primaryText={'Daily Carb Consumption: ' + NFdailyAvg['nf_total_carbohydrate'] + 'g'} 
											secondaryText={'Daily Fiber Consumption: ' + NFdailyAvg['nf_dietary_fiber'] + 'g, ' +
																		 'Daily Sugar Consumption: ' + NFdailyAvg['nf_sugars']} />
						<Divider insert={true} />
						<ListItem primaryText={'Daily Fat Consumption ' + NFdailyAvg['nf_total_fat'] + 'g'} 
											secondaryText={'Daily Saturated Fat Consumption: ' + NFdailyAvg['nf_saturated_fat'] + 'g, ' + 
																		 'Daily Polyunsaturated Fat Consumption: ' + NFdailyAvg['nf_polyunsaturated_fat'] + 'g, ' + 
																		 'Daily Monounsaturated Fat Consumption: ' + NFdailyAvg['nf_monounsaturated_fat'] + 'g, ' + 
																		 'Daily Trans Fat Consumption: ' + NFdailyAvg['nf_trans_fatty_acid'] + 'g'} />
						<Divider insert={true} />
						<ListItem primaryText={'Daily Cholesterol Consumption: ' + NFdailyAvg['nf_cholesterol'] + 'mg'} />
						<Divider insert={true} />
						<ListItem primaryText={'Daily Sodium Consumption: ' + NFdailyAvg['nf_sodium'] + 'mg'} />
						<Divider insert={true} />
						<ListItem primaryText={'Daily Vitamin A Consumption: ' + NFdailyAvg['nf_vitamain_a_dv'] + '% DV'} />
						<Divider insert={true} />
						<ListItem primaryText={'Daily Vitamin C Consumption: ' + NFdailyAvg['nf_vitamin_c_dv'] + '% DV'} />
						<Divider insert={true} />
						<ListItem primaryText={'Daily Calcium Consumption: ' + NFdailyAvg['nf_calcium_dv'] + '% DV'} />
						<Divider insert={true} />
						<ListItem primaryText={'Daily Iron Consumption: ' + NFdailyAvg['nf_iron'] + '% DV'} />
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

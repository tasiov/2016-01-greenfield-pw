import React from 'react';
import Food from './Food.jsx';
import MealsList from './MealsList.jsx'

const CalorieLog = ({user}) => {
	let mealsByDate = _.groupBy(user.meals, (meal) => meal.createdAt);
	console.log('food in calorie-log ', user.foods);
	return (
			<div className='calorie-log'>
			{_.values(mealsByDate).map((meals, i) => <MealsList meals={meals} foods={user.foods} key={i}/> )}
			</div>
		);
}

export default CalorieLog

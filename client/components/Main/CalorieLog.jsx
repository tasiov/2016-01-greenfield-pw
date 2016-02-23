import React from 'react';
import Food from './Food.jsx';
import MealsList from './MealsList.jsx'

const CalorieLog = ({user}) => {
	let mealsByDate = _.groupBy(user.meals, (meal) => meal.createdAt);
	return (
			<div className='calorie-log'>
			{_.values(mealsByDate).map((meals) => <MealsList meals={meals} foods={user.foods}/> )}
			</div>
		);
}

export default CalorieLog

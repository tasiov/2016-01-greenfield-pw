import React from 'react';
import Food from './Food.jsx';
import {NutritionCounter} from './NutritionCounter.jsx'

const Meal = ({meal, foods}) => {
	return (
	<div className='meal-element'>
		<div className='meal-title'>{meal.createdAt}</div>
		{_.keys(meal.foodsEaten).map((foodId) => {
			let name = foods[foodId]['item_name'];
			return (
				<div className='food-entry' key={foodId}>
					<span className='num-eaten'>{meal.foodsEaten[foodId]}</span>
					<Food name={name}  />
				</div>
				);
			})
		}
	<NutritionCounter meals={[meal]} foods={foods} />
	</div>
	);
}

export default Meal
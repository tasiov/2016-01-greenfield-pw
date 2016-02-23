import React from 'react';
import Food from './Food.jsx';
import { connect } from 'react-redux';
import NutritionCounter from './NutritionCounter.jsx';


let MealsList = ({meals, foods}) => {
	console.log('in meals list and rendering ', meals);
	return (
		<div className='meals-list'>
			{meals.map(meal => {
				return (
				<div className='meal-element'>
					<div className='meal-title'>{meal.createdAt}</div>
					{_.keys(meal.foodsEaten).map((foodId) => {
						console.log(name);
						let name = foods[foodId]['item_name'];
						return (
							<div className='food-entry'>
								<span className='num-eaten'>{meal.foodsEaten[foodId]}</span>
								<Food name={name} key={foodId} />
							</div>
							);
						})
					}
				<NutritionCounter meals={[meal]} foods={foods} />
				</div>
				);
			})}	
		</div>

	);
}

export default MealsList

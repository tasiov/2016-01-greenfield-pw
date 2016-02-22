import React from 'react';
import Food from './Food.jsx';

let MealsList = ({meals, foods}) => {

	return (
		<div className='meals-list'>
			{meals.map(meal => {
				return (
				<div className='meal-element'>
					<div className='meal-title'>{meal.createdAt}</div> 
					{_.keys(meal.foods).map((foodId) => {
						let name = foods[foodId]['item_name'];
						return (
							<div className='food-entry'>
								<span className='num-eaten'>{meal.foods[foodId]}</span>
								<Food name={name} key={foodId} />
							</div>
							);
						})
					}
				</div>
				);
			})}
		</div>

	);
}

export default MealsList
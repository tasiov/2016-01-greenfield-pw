import React from 'react';
import Food from './Food.jsx';

const CalorieLog = ({foods}) => {
	return (
			<div className='calorie-log'>
				{foods.map( (food) => <Food item='food' /> )} 
			</div>
		);
}

export default CalorieLog
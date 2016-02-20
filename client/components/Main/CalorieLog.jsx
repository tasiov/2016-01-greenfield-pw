import React from 'react';
import Food from './Food.jsx';
import SearchBar from './SearchBar.jsx';

const CalorieLog = ({foods}) => {
	return (
			<div className='calorie-log'>
        <SearchBar />
			</div>
		);
}

export default CalorieLog

        // {foods.map( (food) => <Food item='food' /> )}

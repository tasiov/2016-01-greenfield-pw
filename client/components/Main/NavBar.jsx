import React from 'react';
import NavButton from './NavButton.jsx';


const NavBar = ({}) => {

	return (
		<div className='nav-bar'>
			<NavButton show="Summary">
				Summary
			</NavButton>

			<NavButton show="CalorieLog" >
				Calorie Log
			</NavButton>

			<NavButton show="RecordMeals">
				Record Meals
			</NavButton>
		</div>
		);
}

export default NavBar;

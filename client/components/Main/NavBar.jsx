import React from 'react';
import NavButton from './NavButton.jsx';
import CalorieLog from './CalorieLog.jsx';


const NavBar = ({}) => {

	return (
		<div className='nav-bar'>
			<NavButton show='Summary'>
				Summary
			</NavButton>

			<NavButton show="CalorieLog">
				<CalorieLog />
			</NavButton>

			<NavButton show="recordMeals">
				Record Meals
			</NavButton>
		</div>
		);
}

export default NavBar;

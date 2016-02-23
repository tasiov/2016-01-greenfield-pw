import React from 'react';
import NavButton from './NavButton.jsx';
import Tabs from 'material-ui/lib/tabs/tabs.js';
import Tab from 'material-ui/lib/tabs/tab.js';

const NavBar = ({}) => {
	return (
		<div className="nav-bar">
			<Tabs>
				<Tab label="Summary">
					Summary
				</Tab>

				<Tab label="CalorieLog" >
					Calorie Log
				</Tab>

				<Tab label="RecordMeals">
					Record Meals
				</Tab>
			</Tabs>
		</div>
		);
}

export default NavBar;

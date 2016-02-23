import React from 'react';
import { connect } from 'react-redux';
import { changePage } from '../../actions/index.jsx';
import Tab from 'material-ui/lib/tabs/tab.js';


let NavButton = ({dispatch, children, show}) => {
	let changeMainPage = () => {
    dispatch(changePage(show));
  }
	
	return (
		<div className='nav-button' onClick={changeMainPage}>
			{children}
		</div>
		);
}

NavButton = connect()(NavButton)
export default NavButton;
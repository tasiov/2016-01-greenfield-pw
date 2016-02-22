import React from 'react';
import { connect } from 'react-redux';
import { changePage } from '../../actions/index.jsx';



let NavButton = ({dispatch, children, show}) => {
	let changeMainPage = () => {
    dispatch(changePage(show));
    console.log('changed page to ', show)
  }
	
	return (
		<div className='nav-button' onClick={changeMainPage}>
			{children}
		</div>
		);
}

NavButton = connect()(NavButton)
export default NavButton;
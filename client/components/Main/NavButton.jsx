import React from 'react';

const NavButton = ({children, show}) => {
	
	return (
		<div className='nav-button'>
			{children}
		</div>
		);
}

export default NavButton;
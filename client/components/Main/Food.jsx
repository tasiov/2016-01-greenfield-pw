import React from 'react';

const Food = ({name, brand, key}) => {
	return (
		<div className='food-item'>
			{name}, {brand}
		</div>
	);
}

export default Food;

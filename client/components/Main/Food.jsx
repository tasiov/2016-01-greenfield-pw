import React from 'react';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';

const Food = ({name, brand, key}) => {
	return (
		<div className='food-item'>
      <TableRow>
			  <TableRowColumn>{name}</TableRowColumn>
        <TableRowColumn>{brand}</TableRowColumn>
      </TableRow>
		</div>
	);
}

export default Food;

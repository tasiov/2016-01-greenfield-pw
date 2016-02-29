import React from 'react';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import ContentRemove from 'material-ui/lib/svg-icons/content/remove';

const Food = ({food, key, buttonAction, buttonIcon, numEaten}) => {
  let name = food['item_name'];
  let brand = food['brand_name'];


  let buttonColumn;
  if(buttonAction){
    buttonColumn = (
      <TableRowColumn>
        <FloatingActionButton
          onMouseDown={buttonAction}
          onTouchStart={buttonAction}
          mini={true}
          secondary={true}>
          {buttonIcon === 'add' ? <ContentAdd /> : <ContentRemove />}
        </FloatingActionButton>
      </TableRowColumn>
    );
   }

  let inputColumn;
  if(numEaten){
    inputColumn = (
      <TableRowColumn>
        <input type="number" ref = {numEaten} />
      </TableRowColumn>
    );
   }
    // Assign Icon based on Button Action
    return (
      <TableRow className='food-item'>
        {inputColumn} 
        <TableRowColumn>{name}</TableRowColumn>
        <TableRowColumn>{brand}</TableRowColumn>
        {buttonColumn}
      </TableRow>
    )
    
}

export default Food;

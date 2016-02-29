import React from 'react';
import Food from './Food.jsx';

import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import SearchIcon from 'material-ui/lib/svg-icons/actions/search';

import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';

const Search = ({foodList, queryFoods, selectFood}) => {
  let query;

  let handleSubmit = (e) => {
    e.preventDefault();
    queryFoods(query.value);
  }

  let onFoodClick = (food) => {
    selectFood(food);
  }

  return (
    
    <div className='search'>
     <form onsubmit={handleSubmit}>
      <TextField 
        ref={(ref) => query = ref}
        hintText="What did you Eat?"
      />
      <RaisedButton 
        icon={<SearchIcon />}
      />
    </form>
    <br/>

       <Table>

        <TableHeader
          displaySelectAll={false}
        >
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Made By</TableHeaderColumn>
            <TableHeaderColumn></TableHeaderColumn>
          </TableRow>
        </TableHeader>

        <TableBody
          displayRowCheckbox={false}
        >
        {_.values(foodList).map( (food, i) => {
          return (
              <Food 
                name={food['item_name']} 
                brand={food['brand_name']}
                key={i} 
                buttonAction = {onFoodClick.bind(this,food)}
                buttonIcon = "add"
              />
          );
        })}
        </TableBody>
      </Table>
    </div>
  );
}

export default Search;

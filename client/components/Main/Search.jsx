import React from 'react';
import Food from './Food.jsx';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import RaisedButton from 'material-ui/lib/raised-button';

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
      <input type="text" placeholder="What did you eat?" ref={(ref) => query = ref} />
      <RaisedButton label="Submit" style={{margin:"8px"}} onMouseDown={handleSubmit}/>
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
                food={food}
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

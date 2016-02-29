import React from 'react';
import Food from './Food.jsx';
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
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="What did you eat?" ref={(ref) => query = ref} />
        <input type="submit" />
      </form>
      <br/>

       <Table>

        <TableHeader>
          <TableRow>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Made By</TableHeaderColumn>
          </TableRow>
        </TableHeader>

        <TableBody>
        {_.values(foodList).map( (food, i) => {
          return (
            <div key={i} onClick={onFoodClick.bind(this,food)}>
              <Food name={food['item_name']} brand={food['brand_name']}/>
            </div>);
        })}
        </TableBody>
        </Table>
    </div>
  );
}

export default Search;

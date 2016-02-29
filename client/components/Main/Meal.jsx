import React from 'react';
import Food from './Food.jsx';
import {NutritionCounter} from './NutritionCounter.jsx';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';

const Meal = ({meal, foods}) => {
	return (
	<div className='meal-element'>
		<Table>

		 <TableHeader className='meal-title'>
        <TableRow>
          <TableHeaderColumn>{meal.createdAt}</TableHeaderColumn>
        </TableRow>
      </TableHeader>

      <TableBody>
			{_.keys(meal.foodsEaten).map((foodId) => {
				let name = foods[foodId]['item_name'];
				return (
					<div className='food-entry' key={foodId}>
						<span className='num-eaten'>{meal.foodsEaten[foodId]}</span>
						<Food name={name}  />
					</div>
					);
				})
			}
			</TableBody>
		</Table>
	<NutritionCounter meals={[meal]} foods={foods} />
	</div>
	);
}

export default Meal
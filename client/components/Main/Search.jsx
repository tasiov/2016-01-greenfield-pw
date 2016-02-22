import React from 'react';
import Food from './Food.jsx';

const Search = ({foodList, queryFoods, selectFood}) => {
  let query;

  let handleSubmit = (e) => {
    e.preventDefault();
    queryFoods(query.value);
  }

  let onFoodClick = (food) => {
    selectFood(food);
  }

  let removeSelectedFood = (food) => {
    removeFood(food);
  }

  return (
    <div className='search'>
      <h3>SearchBar</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="What did you eat?" ref={(ref) => query = ref} />
        <input type="submit" />
      </form>
      <br/>
        {_.values(foodList).map( (food) => {
          return (
            <div onClick={onFoodClick.bind(this,food)} key={food._id}>
              <Food name={food['item_name']} brand={food['brand_name']}/>
            </div>);
        })}
    </div>
  );
}

export default Search;

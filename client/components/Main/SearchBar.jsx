import React from 'react';
import Food from './Food.jsx';

const SearchBar = ({foodList, selectedFood, queryFoods, selectFood}) => {
  let query;

  let handleSubmit = (e) => {
    e.preventDefault();
    queryFoods(query.value);
  }

  let foodListEntries = () => {
    return foodList.map((food) =>
      <div onClick={selectFood} key={food._id}>
        <Food name={food.fields.item_name} brand={food.fields.brand_name} />
      </div>
    );
  }

  return (
    <div className='search'>
      <h3>SearchBar</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="What did you eat?" ref={(ref) => query = ref} />
        <input type="submit" />
      </form>
      <br/>
      {foodListEntries()}
      <br/>
      <h5>Current Selection</h5>
      {selectedFood.food}
    </div>
  );
}

export default SearchBar;

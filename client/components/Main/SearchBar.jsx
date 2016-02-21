import React from 'react';
import Food from './Food.jsx';

let SearchBar = ({foodList, queryFoods}) => {
  let query;

  let handleSubmit = (e) => {
    e.preventDefault();
    queryFoods(query.value);
  }

  let foodListEntries = () => {
    return foodList.map((food) =>
      <Food name={food.fields.item_name} brand={food.fields.brand_name} key={food._id} />
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
    </div>
  );
}

export default SearchBar;

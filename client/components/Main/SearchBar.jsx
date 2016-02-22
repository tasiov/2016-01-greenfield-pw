import React from 'react';
import Food from './Food.jsx';

const SearchBar = ({foodList, selectedFood, queryFoods, selectFood}) => {
  let query;

  let handleSubmit = (e) => {
    e.preventDefault();
    queryFoods(query.value);
  }

  let selectedFoodElement = selectedFood.fields ?
    <Food name={selectedFood.fields.item_name} brand={selectedFood.fields.brand_name}/>
    : <div>No Entry Selected</div>;

  return (
    <div className='search'>
      <h3>SearchBar</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="What did you eat?" ref={(ref) => query = ref} />
        <input type="submit" />
      </form>
      <br/>
        {foodList.map( (food) => {
          let onFoodClick = () => {
            selectFood(food);
          }
          return (
            <div onClick={onFoodClick} key={food._id}>
              <Food name={food.fields.item_name} brand={food.fields.brand_name}/>
            </div>);
        })}
      <br/>
      <h5>Current Selection</h5>
      {selectedFoodElement}
    </div>
  );
}

export default SearchBar;

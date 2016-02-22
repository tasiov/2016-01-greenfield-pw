import React from 'react';
import Food from './Food.jsx';

const SearchBar = ({foodList, selectedFoods, queryFoods, selectFood, removeFood}) => {
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


  let selectedFoodsDisplay = _.isEmpty(selectedFoods) ?
    <div>No entry selected</div> :
    (_.values(selectedFoods).map((food) => {
      let name = food['item_name'];
      let brand = food['brand_name'];
      let id = food['item_id'];
      return (
        <div className='selectedFoodEntry' >
          <Food name={name} brand={brand} key={id}/>
        <span onClick={removeSelectedFood.bind(this,food)}>[X]</span></div>
      );
    }));
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
      <br/>
      <h5>Current Selection</h5>
      {selectedFoodsDisplay}
    </div>
  );
}

export default SearchBar;

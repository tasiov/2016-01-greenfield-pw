import React from 'react';
import Food from './Food.jsx';

const SelectFood = ({selectedFoods, removeFood}) => {
  let timesEaten = [];

  let removeSelectedFood = (food) => {
    removeFood(food);
  }


  let selectedFoodsDisplay = _.isEmpty(selectedFoods) ?
    <div>No entry selected</div> :
    (_.values(selectedFoods).map((food, index) => {
      let name = food['item_name'];
      let brand = food['brand_name'];
      let id = food['item_id'];
      return (
        <div className='selectedFoodEntry' >
          <input type='number' ref={(ref) => timesEaten[index] = ref} />
          <Food name={name} brand={brand} key={id}/>
        <span onClick={removeSelectedFood.bind(this,food)}>[X]</span></div>
      );
    }));
  return (
    <div className='select-food'>
      <h5>Current Selection</h5>
      {selectedFoodsDisplay}
    </div>
  );
}

export default SelectFood;

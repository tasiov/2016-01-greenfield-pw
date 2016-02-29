import React from 'react';
import Food from './Food.jsx';

const SelectFood = ({selectedFoods, removeFood, user, sendMeal, sendFoodItems}) => {
  let timesEaten = [];

  let removeSelectedFood = (food) => {
    removeFood(food);
  }

  let submitMeal = (e) => {
    e.preventDefault();

    let meals = {
      eatenAt: Date.now(),
      eatenBy: user.userInfo.username,
      foodsEaten: {}
    };
    let newFoodIds = [];

    (_.values(selectedFoods).forEach((food, index) => {
      meals.foodsEaten[food.item_id] = timesEaten[index].value;
      if(!(food.item_id in user.foods)) {
        newFoodIds.push(food.item_id);
      }
    }));
    
    sendFoodItems(newFoodIds)
    .then(sendMeal.bind(this, meals));
    
    _.values(selectedFoods).forEach(removeSelectedFood);

  }

  let selectedFoodsDisplay = _.isEmpty(selectedFoods) ?
    <div>No entry selected</div> :
    (_.values(selectedFoods).map((food, index) => {
      let name = food['item_name'];
      let brand = food['brand_name'];
      let id = food['item_id'];
      return (
        <div className='selectedFoodEntry' key={id}>
          <input type='number' defaultValue="1" ref={(ref) => timesEaten[index] = ref} />
          <Food name={name} brand={brand} key={id}/>
        <span onClick={removeSelectedFood.bind(this,food)}>[X]</span></div>
      );
    }));

  return (
    <div className='select-food'>
      <h5>Current Selection</h5>
      {selectedFoodsDisplay}
      {_.isEmpty(selectedFoods) ? null : <button onClick={submitMeal}>Submit</button> }
    </div>
  );
}

export default SelectFood;

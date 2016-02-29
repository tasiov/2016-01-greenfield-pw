import { connect } from 'react-redux';
import { deleteFood, setMeal, addFoodIds } from '../actions/index.jsx';
import SelectFood from '../components/Main/SelectFood.jsx';



const mapStateToProps = (state, ownProps) => {
  return {
    selectedFoods: state.selectedFoods,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		removeFood: (food) => {
      dispatch(deleteFood(food));
    },

    sendMeal: (meal) => {
      $.post( "/meals", {"meal": meal})
      .done((res) => {
        dispatch(setMeal(meal));
      })
      .fail((res) => {
        console.log('error: ', res);
      });
    },

    sendFoodItems: (foodIds) => {
      let getFoodIds = foodIds.map(id => Promise.resolve($.post('/food_id', {'food_id':id})));
      return Promise.all(getFoodIds)
      .then((resultsStrings) => {
        let foodItemObjs = resultsStrings.map(s => JSON.parse(s));
        let foodItemsLookup = _.mapKeys(foodItemObjs, foodFields => {
          return foodFields['item_id'];
        });
        dispatch(addFoodIds(foodItemsLookup));
      })
      .catch((error) => {
        console.log('error ', error);
      });
    }
  };
}

const SelectFoodContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectFood)

export default SelectFoodContainer;

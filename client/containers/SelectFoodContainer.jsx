import { connect } from 'react-redux';
import { deleteFood, setMeal } from '../actions/index.jsx';
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
      dispatch(setMeal(meal));
    }
  };
}

const SelectFoodContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectFood)

export default SelectFoodContainer;

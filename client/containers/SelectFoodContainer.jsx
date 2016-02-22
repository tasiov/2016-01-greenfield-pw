import { connect } from 'react-redux';
import { setSearchResults } from '../actions/index.jsx';
import { setFood, deleteFood } from '../actions/index.jsx';
import SelectFood from '../components/Main/SelectFood.jsx';


const mapStateToProps = (state, ownProps) => {
  return {
    selectedFoods: state.selectedFoods
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		removeFood: (food) => {
      dispatch(deleteFood(food));
    }
  };
}

const SelectFoodContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectFood)

export default SelectFoodContainer;
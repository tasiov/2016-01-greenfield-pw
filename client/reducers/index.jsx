import { combineReducers } from 'redux'

const configureUser = (state = null, action) => {
	switch(action.type) {
		case 'SET_USER':
			return action.userObj === "Invalid User" ? state : action.userObj;
		case 'SET_MEAL':
		  let mealsArr = state.meals.concat(action.meal);
			return Object.assign({}, state, {meals: mealsArr});
    case 'ADD_FOOD_ID':
      let totalFoods = Object.assign({}, state.foods, action.foodIds);
      return Object.assign({}, state, {foods: totalFoods});
		case 'REMOVE_USER':
			return {};
		default:
			return state;
	}
}

const configurePage = (state = 'Login', action) => {
	switch(action.type) {
		case 'CHANGE_PAGE':
			return action.newPage;
		default:
			return state;
	}
}

const configureSearch = (state = [], action) => {
	switch(action.type) {
		case 'SET_SEARCH_RESULTS':
			return action.searchResults;
		default:
			return state;
	}
}

const configureFood = (state = {}, action) => {
	switch(action.type) {
		case 'SELECT_FOOD':
			let id = action.selectedFood['item_id'];
			let foodObj = {
				[id]: action.selectedFood
			}
			return Object.assign({}, state, foodObj);
		case 'REMOVE_FOOD':
			return _.omit(state, action.selectedFood['item_id']);
		default:
			return state;
	}
}

const configureProgress = (state = {timeWindow: 7, filter: 'nf_calories'}, action) => {
	switch(action.type) {
		case 'PROGRESS_TIME_SET':
			return Object.assign({}, state, {timeWindow: action.timeWindow});
		case 'PROGRESS_FILTER_SET':
			return Object.assign({}, state, {filter: action.filter});
		default:
			return state;
	}
}

const foodAppHandler = combineReducers({
	user: configureUser,
	page: configurePage,
	foodQueries: configureSearch,
	selectedFoods: configureFood,
	progressBar: configureProgress
});

export default foodAppHandler;

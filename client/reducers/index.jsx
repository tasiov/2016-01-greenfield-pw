import { combineReducers } from 'redux'

const configureUser = (state = null, action) => {
	window.statePeek = state;
	switch(action.type) {
		case 'SET_USER':	
			console.log('changing state user to ' + JSON.stringify(action.userObj));
			return action.userObj === "Invalid User" ? state : action.userObj;
		default:
			console.log('default triggered');
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

const configureMeals = (state = [], action) => {
	switch(action.type) {
		case 'SET_MEALS':
			return state.userObj.meals.concat(action.meals);
		default:
			return state;
	}
}

const foodAppHandler = combineReducers({
	user: configureUser,
	page: configurePage,
	foodQueries: configureSearch,
	selectedFoods: configureFood,
	userMeals: configureMeals
});

export default foodAppHandler;

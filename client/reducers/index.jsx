import { combineReducers } from 'redux'

const configureUser = (state = null, action) => {
	switch(action.type) {
		case 'SET_USER':
			return action.userObj === "Invalid User" ? state : action.userObj;
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

const configureSearch = (state = '', action) => {
	switch(action.type) {
		default:
			return state;
	}
}

const foodAppHandler = combineReducers({
	user: configureUser,
	page: configurePage,
	foodQueries: configureSearch
});
export default foodAppHandler;

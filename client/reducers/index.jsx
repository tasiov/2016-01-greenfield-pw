import { combineReducers } from 'redux'

const configureUser = (state = null, action) => {
	switch(action.type) {
		case 'SET_USER':
			return action.userObj
		default:
			return state
	}
}

const foodAppHandler = combineReducers({
	user: configureUser
}); 
export default foodAppHandler;
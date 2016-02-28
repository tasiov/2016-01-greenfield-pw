export const setUser = (userObj) => {
	return {
		type: 'SET_USER',
		userObj
	};
};

export const changePage = (newPage) => {
	return {
		type: 'CHANGE_PAGE',
		newPage
	};
};

export const setSearchResults = (searchResults) => {
  return {
    type: 'SET_SEARCH_RESULTS',
    searchResults
  };
};

export const setFood = (selectedFood) => {
  return {
    type: 'SELECT_FOOD',
    selectedFood
  };
};

export const deleteFood = (selectedFood) => {
	return {
		type: 'REMOVE_FOOD',
		selectedFood
	};
};

export const setMeal = (meal) => {
  return {
    type: 'SET_MEAL',
    meal
  };
};

export const addFoodIds = (foodIds) => {
  return {
    type: 'ADD_FOOD_ID',
    foodIds
  };
};

export const removeUser = () => {
  return {
    type: 'REMOVE_USER'
  };
};

export const setTimeOnProgress = (timeWindow) => {
  return {
    type: 'PROGRESS_TIME_SET',
    timeWindow
  };
};

export const setFilterOnProgress = (filter) => {
  return {
    type: 'PROGRESS_FILTER_SET',
    filter
  };
};
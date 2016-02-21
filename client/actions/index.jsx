export const setUser = (userObj) => {
	return {
		type: 'SET_USER',
		userObj
	}
}

export const changePage = (newPage) => {
	return {
		type: 'CHANGE_PAGE',
		newPage
	}
}

export const setSearchResults = (searchResults) => {
  return {
    type: 'SET_SEARCH_RESULTS',
    searchResults
  }
}

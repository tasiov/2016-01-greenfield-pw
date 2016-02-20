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
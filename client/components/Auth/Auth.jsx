import React from 'react';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';

const Auth = ({page, changePage}) => {
	var currPage;
	if(page === "Login") {
		currPage = <Login change= {changePage} />;
	} else if(page === "Signup") {
		currPage = <Signup change= {changePage}/>;
	}

	return currPage;

}

export default Auth

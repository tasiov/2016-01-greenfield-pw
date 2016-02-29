import React from 'react';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';

const Auth = ({page, changePage}) => {
	if(page === "Login") {
		return (
      <div className="landing">
        <h1>Eat.ly</h1>
        <Login change= {changePage} />
      </div>
    )
	} else if(page === "Signup") {
    return (
      <div className="landing">
        <h1>Eat.ly</h1>
        <Signup change= {changePage}/>;
      </div>
    )
	}

	return currPage;
}

export default Auth

import React from 'react';
import Main from './Main/Main.jsx';
import Login from './Auth/Login.jsx';
import AuthContainer from '../containers/AuthContainer.jsx';
import MainContainer from '../containers/MainContainer.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const App = ({user, getUser}) => {

  if(!user || !user.meals) {
    getUser();
    return (<AuthContainer />);
  } else {
    return (<MainContainer />);
  }
}

export default App;

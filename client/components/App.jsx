import React from 'react';
import Main from './Main/Main.jsx';
import Login from './Auth/Login.jsx';
import AuthContainer from '../containers/AuthContainer.jsx';
import MainContainer from '../containers/MainContainer.jsx';


const App = ({user, getUser}) => {
  if(!user) {
    getUser();
    return (<AuthContainer />);
  } else {
    return (<MainContainer />);
  }
}

export default App;

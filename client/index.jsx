import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import AppContainer from './containers/AppContainer.jsx';
=======
// import AppView from './containers/AppContainer.jsx';
import AppContainer from './components/App.jsx';
>>>>>>> replaces AppView label with AppContainer
import foodAppHandler from './reducers/index.jsx'
import { Provider } from 'react-redux';
import { createStore } from 'redux';


let store = createStore(foodAppHandler);

ReactDOM.render(
	<Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('app')
);

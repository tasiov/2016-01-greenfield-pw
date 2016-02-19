import React from 'react';
import ReactDOM from 'react-dom';
import AppView from './containers/AppContainer.jsx';
import foodAppHandler from './reducers/index.jsx'
import { Provider } from 'react-redux';
import { createStore } from 'redux';


let store = createStore(foodAppHandler);

ReactDOM.render(
	<Provider store={store}>
    <AppView />
  </Provider>,
  document.getElementById('app')
);

import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer.jsx';
import foodAppHandler from './reducers/index.jsx'
import { Provider } from 'react-redux';
import { createStore, getState, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { ActionCreators } from 'redux-undo';

let store = createStore(foodAppHandler, applyMiddleware(logger()));

window.getState = store.getState
window.onpopstate = function(event) {
	event.preventDefault();
	store.dispatch(ActionCreators.undo());
};
ReactDOM.render(
	<Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('app')
);

import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

import { rootReducer, client } from './reducers/index';

const defaultState = {};

export const store = createStore(
  rootReducer,
  defaultState,
  compose(
    applyMiddleware(client.middleware()),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
);

export const history = syncHistoryWithStore(browserHistory, store);

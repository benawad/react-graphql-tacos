import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, IndexRoute } from 'react-router';

import { ApolloProvider } from 'react-apollo';

import App from './components/App';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';

import { history, store } from './store';

import { client } from './reducers/index';


const router = (
  <ApolloProvider store={store} client={client}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />
      </Route>
    </Router>
  </ApolloProvider>
);

ReactDOM.render(
  router,
  document.getElementById('root'),
);

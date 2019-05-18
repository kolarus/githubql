import React from 'react';
import {
  Router, Route, Switch,
} from 'react-router-dom';

import { ApolloProvider } from 'react-apollo';
import client from './appolo.config';

import history from './utils/history';

import GitViewer from './features/GitViewer';
import Header from './components/Header';
import Unauthorized from './components/Unauthorized';
import Error from './components/Error';
import Toastify from './components/Toastify';

import './App.css';

function App() {
  return (
    <Router history={history}>
      <ApolloProvider client={client}>
        <Header />
        <Switch>
          <Route exact path="/" component={GitViewer} />
          <Route path="/unauthorized" component={Unauthorized} />
          <Route path="/error" component={Error} />
          <Route component={() => <Error error={{ statusCode: 404, message: 'Page not found' }} />} />
        </Switch>
        <Toastify />
      </ApolloProvider>
    </Router>
  );
}

export default App;

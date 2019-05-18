import React from 'react';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { toast } from 'react-toastify';
import {
  Router, Route, Switch, Link,
} from 'react-router-dom';
import history from './utils/history';
import { GITHUB_ACCESS_TOKEN } from './constants/constants';


import GitViewer from './features/GitViewer';
import Header from './components/Header';
import Unauthorized from './components/Unauthorized';
import Toastify from './components/Toastify';

import './App.css';
import UnauthorizeedToast from "./components/Toastify/toasts/UnauthorizedToast";

const cache = new InMemoryCache();

const GITHUB_BASE_URL = 'https://api.github.com/graphql';

const logoutLink = onError(({ networkError }) => {
  if (networkError.statusCode === 401) {
    toast.error(<UnauthorizeedToast />, {
      position: toast.POSITION.TOP_CENTER,
    });
    history.push('/unauthorized');
  }
});

const httpLink = new HttpLink({
  uri: GITHUB_BASE_URL,
  headers: {
    authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
  },
});

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
  },
  query: {
    fetchPolicy: 'network-only',
  },
};

const client = new ApolloClient({
  link: logoutLink.concat(httpLink),
  cache,
  defaultOptions,
});

function App() {
  return (
    <Router history={history}>
      <ApolloProvider client={client}>
        <Header />
        <Switch>
          <Route exact path="/" component={GitViewer} />
          <Route path="/unauthorized" component={Unauthorized} />
        </Switch>
        <Toastify />
      </ApolloProvider>
    </Router>
  );
}

export default App;

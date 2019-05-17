import React from 'react';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import GitViewer from './features/GitViewer';
import Header from './components/Header';

import './App.css';

const cache = new InMemoryCache();

const GITHUB_BASE_URL = 'https://api.github.com/graphql';

const httpLink = new HttpLink({
  uri: GITHUB_BASE_URL,
  headers: {
    authorization: 'Bearer 0c67b9d917c4eba0e92e751ced57a735cd6d8829',
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
  link: httpLink,
  cache,
  defaultOptions,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Header />
      <GitViewer />
    </ApolloProvider>
  );
}

export default App;

import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import unauthorizedError from './utils/errors-interceptor';
import httpLink from './utils/httpLink';

const cache = new InMemoryCache();

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
  },
  query: {
    fetchPolicy: 'network-only',
  },
};

const client = new ApolloClient({
  link: unauthorizedError.concat(httpLink),
  cache,
  defaultOptions,
});

export default client;
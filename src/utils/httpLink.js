import { HttpLink } from 'apollo-link-http';
import { GITHUB_ACCESS_TOKEN, GITHUB_BASE_URL } from '../constants/constants';

const httpLink = new HttpLink({
  uri: GITHUB_BASE_URL,
  headers: {
    authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
  },
});

export default httpLink;

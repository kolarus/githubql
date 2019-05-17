import gql from 'graphql-tag';

const GET_REPO_INFO = gql`
  query($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
        name
        url
    }
  }`;

export default GET_REPO_INFO;

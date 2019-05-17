import gql from 'graphql-tag';

const SEARCH_USER = gql`
  query($user: String!) {
    search(query: $user, type: USER, first: 10) {
        edges {
            node {
                ... on User {
                    id
                    name
                    login 
                    email
                }
            }
        }
    }
  }`;

export default SEARCH_USER;

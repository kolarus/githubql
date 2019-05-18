import gql from 'graphql-tag';

const GET_USER_REPOS = gql`
  query($user: String!) {
    user(login: $use) {
        repositories(first: 20) {
            nodes {
                name,
                updatedAt
                owner {
                    login
                }
            }
        }
    }
  }`;

export default GET_USER_REPOS;

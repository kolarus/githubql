import gql from 'graphql-tag';

const GET_USER_REPOS = gql`
  query($user: String!, $limit: Int!) {
    user(login: $user) {
        repositories(first: $limit, orderBy: {field: UPDATED_AT, direction: DESC}) {
            totalCount
            pageInfo {
                endCursor
                startCursor
                hasPreviousPage
                hasNextPage
            } 
            nodes {
                id
                name
                updatedAt
                owner {
                    login
                }
            }
        }
    }
  }`;

export default GET_USER_REPOS;

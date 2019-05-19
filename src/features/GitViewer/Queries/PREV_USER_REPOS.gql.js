import gql from 'graphql-tag';

const PREV_USER_REPOS = gql`
  query($user: String!, $limit: Int!, $cursor: String!) {
    user(login: $user) {
        repositories(last: $limit, orderBy: {field: UPDATED_AT, direction: DESC}, before: $cursor) {
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

export default PREV_USER_REPOS;

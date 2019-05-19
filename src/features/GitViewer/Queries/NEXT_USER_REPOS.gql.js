import gql from 'graphql-tag';

const NEXT_USER_REPOS = gql`
  query($user: String!, $limit: Int!, $cursor: String!) {
    user(login: $user) {
        repositories(first: $limit, orderBy: {field: UPDATED_AT, direction: DESC}, after: $cursor) {
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

export default NEXT_USER_REPOS;

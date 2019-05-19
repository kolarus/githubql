import gql from 'graphql-tag';

const GET_REPO_INFO = gql`
  query($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
        id
        name
        url
        viewerHasStarred
        isPrivate
        description 
        createdAt
        primaryLanguage {
            name
        }
        repositoryTopics(first: 3) {
            nodes {
                topic {
                    id
                    name
                }
            }
        }
    }
  }`;

export default GET_REPO_INFO;

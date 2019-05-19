import gql from 'graphql-tag';

const VIEWER = gql`
  query {
    viewer {
        name
        login
        avatarUrl
    }
}`;

export default VIEWER;

import gql from 'graphql-tag';

const ADD_STAR = gql`
  mutation($id: ID!) {
    addStar(input: {starrableId: $id}) {
      clientMutationId
        starrable {
            viewerHasStarred
        }
    }
  }`;

export default ADD_STAR;

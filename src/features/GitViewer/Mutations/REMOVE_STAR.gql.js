import gql from 'graphql-tag';

const REMOVE_STAR = gql`
  mutation($id: ID!) {
    removeStar(input: {starrableId: $id}) {
      clientMutationId
        starrable {
            viewerHasStarred
        }
    }
  }`;

export default REMOVE_STAR;

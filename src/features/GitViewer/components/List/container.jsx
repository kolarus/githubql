import React from 'react';
import { graphql } from 'react-apollo';

import { SwishSpinner } from 'react-spinners-kit';

import ListPlaceholder from './ListPlaceholder';
import List from './component';
import GET_USER_REPOS from '../../Queries/GET_USER_REPOS.gql';
import destructurePageInfo from '../../../../utils/destructurePageInfo';

const ListContainer = (props) => {
  const {
    reset, data,
  } = props;

  if (!data || reset) return <ListPlaceholder />;
  if (data.error) return `Error! ${data.error.message}`;
  if (data.loading) return <SwishSpinner />;

  return (
    <List
      {...props}
      data={data}
      fetchMore={data.fetchMore}
    />
  );
};

const options = ({ selectedUserLogin, setCursors }) => ({
  variables: { user: selectedUserLogin, limit: 3 },
  onCompleted: data => setCursors(destructurePageInfo(data)),
});

export default graphql(GET_USER_REPOS, {
  skip: props => !props.selectedUserLogin,
  options,
})(ListContainer);

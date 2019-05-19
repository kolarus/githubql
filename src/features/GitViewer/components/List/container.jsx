import React from 'react';
import PropTypes from 'prop-types';

import { graphql } from 'react-apollo';

import { SwishSpinner } from 'react-spinners-kit';

import ListPlaceholder from './ListPlaceholder';
import List from './component';
import GET_USER_REPOS from '../../Queries/GET_USER_REPOS.gql';
import { REPOS_PER_PAGE } from '../../../../constants/constants';
import destructurePageInfo from '../../../../utils/destructurePageInfo';

const ListContainer = (props) => {
  const {
    reset,
    data,
  } = props;

  if (!data || !data.user || reset) return <ListPlaceholder />;
  /*if (data.user && data.loading) {
    return (
      <List
        {...props}
        fetchMore={data.fetchMore}
      />
    );
  }*/
  //if (data.loading) return <ListPlaceholder />;
  if (data.error) return `Error! ${data.error.message}`;

  return (
    <List
      {...props}
      fetchMore={data.fetchMore}
    />
  );
};

ListContainer.propTypes = {
  data: PropTypes.shape(Object),
  reset: PropTypes.bool.isRequired,
};

ListContainer.defaultProps = {
  data: null,
};

const options = ({ selectedUserLogin, setCursors }) => ({
  variables: { user: selectedUserLogin, limit: REPOS_PER_PAGE },
  onCompleted: data => setCursors(destructurePageInfo(data)),
});

export default graphql(GET_USER_REPOS, {
  skip: props => !props.selectedUserLogin,
  options,
})(ListContainer);

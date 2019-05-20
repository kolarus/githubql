import React from 'react';
import PropTypes from 'prop-types';

import { graphql } from 'react-apollo';
import { loader } from 'graphql.macro';

import ListPlaceholder from './ListPlaceholder';
import List from './component';

import { REPOS_PER_PAGE } from '../../../../constants/constants';

import destructurePageInfo from '../../../../utils/destructurePageInfo';

const GET_USER_REPOS = loader('../../Queries/GET_USER_REPOS.gql');

const ListContainer = (props) => {
  const {
    reset,
    usersRepos,
  } = props;

  if (!usersRepos || !usersRepos.user || reset) return <ListPlaceholder />;
  if (usersRepos.error) return `Error! ${usersRepos.error.message}`;

  return (
    <List
      {...props}
      fetchMore={usersRepos.fetchMore}
    />
  );
};

ListContainer.propTypes = {
  usersRepos: PropTypes.shape(Object),
  reset: PropTypes.bool.isRequired,
};

ListContainer.defaultProps = {
  usersRepos: null,
};

const options = ({ selectedUserLogin, setCursors }) => ({
  variables: { user: selectedUserLogin, limit: REPOS_PER_PAGE },
  onCompleted: data => setCursors(destructurePageInfo(data)),
});

export default graphql(GET_USER_REPOS, {
  skip: props => !props.selectedUserLogin,
  options,
  name: 'usersRepos',
})(ListContainer);

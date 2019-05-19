import React from 'react';
import PropTypes from 'prop-types';

import { graphql, compose } from 'react-apollo';

import RepositoryInfoPlaceholder from './RepositoryInfoPlaceholder';

import GET_REPO_INFO from '../../Queries/GET_REPO_INFO.gql';
import ADD_STAR from '../../Mutations/ADD_STAR.gql';
import REMOVE_STAR from '../../Mutations/REMOVE_STAR.gql';

import RepositoryInfo from './component';

const RepositoryInfoContainer = (props) => {
  const { data, viewingRepo } = props;

  if (!data || !viewingRepo) return null;
  if (data.loading) return <RepositoryInfoPlaceholder />;
  if (data.error) return `Error! ${data.error.message}`;

  return (<RepositoryInfo {...props} />);
};

const options = ({ selectedRepo, setViewingRepo }) => ({
  variables: { name: selectedRepo.name, owner: selectedRepo.owner.login },
  onCompleted: data => setViewingRepo(data),
});

const mutationOptions = ({ data }) => ({
  variables: {
    id: data && data.repository && data.repository.id
      ? data.repository.id
      : null,
  },
});

RepositoryInfoContainer.propTypes = {
  data: PropTypes.shape(Object),
  viewingRepo: PropTypes.shape(Object),
};

RepositoryInfoContainer.defaultProps = {
  data: null,
  viewingRepo: null,
};

export default compose(
  graphql(GET_REPO_INFO, { skip: props => !props.selectedRepo, options }),
  graphql(ADD_STAR, {
    skip: props => !props.data.repository,
    name: 'addStar',
    options: mutationOptions,
  }),
  graphql(REMOVE_STAR, {
    skip: props => !props.data.repository,
    name: 'removeStar',
    options: mutationOptions,
  }),
)(RepositoryInfoContainer);

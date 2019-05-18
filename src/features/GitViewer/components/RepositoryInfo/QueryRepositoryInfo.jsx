import React from 'react';

import { Query } from 'react-apollo';
import GET_REPO_INFO from '../../Queries/GET_REPO_INFO.gql';

import RepositoryInfo from './RepositoryInfo';

const QueryRepositoryInfo = (props) => {
  const { selectedRepo } = props;

  if (!selectedRepo) {
    return null;
  }
  const { name, owner: { login: userLogin } } = selectedRepo;

  return (
    <Query
      query={GET_REPO_INFO}
      variables={{ name, owner: userLogin }}
      skip={!name || !userLogin}
    >
      {
        ({ loading, error, data }) => {
          if (error) return `Error! ${error.message}`;
          if (loading) return 'Loading';
          if (!data) return null;

          return <RepositoryInfo data={data} />;
        }
      }
    </Query>
  );
};

export default QueryRepositoryInfo;

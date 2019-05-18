import React from 'react';
import { Query } from 'react-apollo';

import { SwishSpinner } from 'react-spinners-kit';

import ListPlaceholder from './ListPlaceholder';
import List from './List';
import GET_USER_REPOS from '../../Queries/GET_USER_REPOS.gql';
import NEXT_USER_REPOS from '../../Queries/NEXT_USER_REPOS.gql';


const QueryList = (props) => {
  const {
    selectedUserLogin,
    reset,
  } = props;

  return (
    <Query
      query={GET_USER_REPOS}
      variables={{
        user: selectedUserLogin,
        limit: 3,
      }}
      skip={!selectedUserLogin}
    >
      {
        ({
          loading, error, data, fetchMore,
        }) => {
          if (error) return `Error! ${error.message}`;
          if (loading) return <SwishSpinner />;
          if (!data || reset) return <ListPlaceholder />;

          return (
            <List
              {...props}
              data={data}
              fetchMore={fetchMore}
            />
          );
        }
      }
    </Query>
  );
};

export default QueryList;

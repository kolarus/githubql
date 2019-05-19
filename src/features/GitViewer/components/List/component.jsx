import React from 'react';
import PropTypes from 'prop-types';

import { List as ListUI } from 'semantic-ui-react';
import Pagination from '../../../../components/Pagination';

import { paginationShape } from '../../../../utils/shapes';
import { REPOS_PER_PAGE } from '../../../../constants/constants';

import daysFormDate from '../../../../utils/daysFormDate';

const List = (props) => {
  const {
    usersRepos,
    setSelectedRepo,
    onPageChange,
    pagination: { activePage },
    fetchMore,
  } = props;

  const { user: { repositories: { totalCount, nodes: repositories } } } = usersRepos;

  if (totalCount <= 0) {
    return <h2>No repositories found for selected user</h2>;
  }

  return (
    <React.Fragment>
      <ListUI divided relaxed>
        {
          repositories.map(node => (
            <ListUI.Item
              onClick={() => setSelectedRepo(node)}
              key={node.id}
            >
              <ListUI.Icon name="github" size="large" verticalAlign="middle" />
              <ListUI.Content>
                <ListUI.Header as="a">{node.name}</ListUI.Header>
                <ListUI.Description as="a">
                  { `Last updated ${daysFormDate(node.updatedAt)} day(s) ago` }
                </ListUI.Description>
              </ListUI.Content>
            </ListUI.Item>
          ))
        }
      </ListUI>
      {
        totalCount / REPOS_PER_PAGE > 1
          ? (
            <Pagination
              onPageChange={(e, { activePage: newActivePage }) => onPageChange(
                newActivePage, fetchMore,
              )}
              activePage={activePage}
              totalPages={Math.ceil(totalCount / REPOS_PER_PAGE)}
            />
          )
          : null
      }
    </React.Fragment>
  );
};

List.propTypes = {
  usersRepos: PropTypes.shape(Object).isRequired,
  setSelectedRepo: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  fetchMore: PropTypes.func.isRequired,
  pagination: PropTypes.shape(paginationShape).isRequired,
};

export default List;

import React from 'react';

import { List as ListUI } from 'semantic-ui-react';
import daysFormDate from '../../../../utils/daysFormDate';
import Pagination from '../../../../components/Pagination';

const List = (props) => {
  const {
    data, setSelectedRepo, onPageChange, pagination, fetchMore,
  } = props;
  return (
    <React.Fragment>
      <ListUI divided relaxed>
        {
            data.user.repositories.nodes.map(node => (
              <ListUI.Item key={node.id}>
                <ListUI.Icon name="github" size="large" verticalAlign="middle" />
                <ListUI.Content>
                  <ListUI.Header onClick={() => setSelectedRepo(node)} as="a">{node.name}</ListUI.Header>
                  <ListUI.Description as="a">
                    { `Last updated ${daysFormDate(node.updatedAt)} day(s) ago` }
                  </ListUI.Description>
                </ListUI.Content>
              </ListUI.Item>
            ))
        }
      </ListUI>
      {
        data.user.repositories.totalCount / 3 > 1
          ? (
            <Pagination
              onPageChange={(e, { activePage: newActivePage }) => onPageChange(
                newActivePage, fetchMore,
              )}
              activePage={pagination.activePage}
              totalPages={Math.ceil(data.user.repositories.totalCount / 3)}
            />
          )
          : null
      }
    </React.Fragment>
  );
};

export default List;

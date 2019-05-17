import React from 'react';
import { SwishSpinner } from 'react-spinners-kit';

import { List as ListUI, Placeholder } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import GET_USER_REPOS from '../../Queries/GET_USER_REPOS.gql';

const List = (props) => {
  const { setSelectedRepo, selectedUserLogin } = props;

  const daysFormDate = date => Math.ceil((Date.now() - new Date(date)) / 86400000);

  return (
    <Query
      query={GET_USER_REPOS}
      variables={{ user: selectedUserLogin }}
      skip={!selectedUserLogin}
    >
      {({ loading, error, data }) => {
        if (error) return `Error! ${error.message}`;

        if (loading) {
          return (<SwishSpinner />);
        } if (!data) {
          return (
            <ListUI divided relaxed>
              {
                  [...Array(3)].map((e, i) => (
                    <ListUI.Item key={i}>
                      <ListUI.Icon name="github" size="large" verticalAlign="middle" />
                      <ListUI.Content>
                        <Placeholder>
                          <Placeholder.Header>
                            <Placeholder.Line />
                            <Placeholder.Line />
                          </Placeholder.Header>
                        </Placeholder>
                      </ListUI.Content>
                    </ListUI.Item>
                  ))
                }
            </ListUI>
          );
        }

        return (
          <ListUI divided relaxed>
            {
              data.user.repositories.nodes.map(node => (
                <ListUI.Item>
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
        );
      }
        }
    </Query>
  );
};

export default List;

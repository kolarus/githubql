import React from 'react';

import {
  Button, Label, Icon, Item,
} from 'semantic-ui-react';

import { Query } from 'react-apollo';
import GET_REPO_INFO from '../../Queries/GET_REPO_INFO.gql';

const RepositoryInfo = (props) => {
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
      {({ loading, error, data }) => {
        if (error) return `Error! ${error.message}`;
        if (loading) return 'Loading';

        return (
          <Item.Group divided>
            <Item>
              <Item.Content>
                <Item.Header as="a">
                  { data.repository.name }
                </Item.Header>
                <Item.Meta>
                  <span className="cinema">IFC Cinema</span>
                </Item.Meta>
                <Item.Description>Repository description</Item.Description>
                <Item.Extra>
                  <Button
                    primary
                    floated="right"
                    target="_blank"
                    disabled={!data.repository.url}
                    href={data.repository.url}
                  >
                    View on github
                    <Icon name="right chevron" />
                  </Button>
                  <Button primary floated="right" disabled>
                    Star repo
                    <Icon name="right star" />
                  </Button>
                  <Label>Label</Label>
                  <Label>Label2</Label>
                </Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
        );
      }
        }
    </Query>
  );
};

export default RepositoryInfo;

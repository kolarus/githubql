import React from 'react';

import {
  Button, Icon, Label, Item,
} from 'semantic-ui-react';

const RepositoryInfo = (props) => {
  const { data } = props;
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
};

export default RepositoryInfo;

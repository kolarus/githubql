import React from 'react';
import { toast } from 'react-toastify';

import {
  Button, Icon, Label, Item,
} from 'semantic-ui-react';

const RepositoryInfo = (props) => {
  const {
    data, addStar, removeStar, setViewingRepo, viewingRepo: { repository }, updateStarState,
  } = props;
  console.log(props);
  const {
    url, name, isPrivate, viewerHasStarred, id,
  } = repository;
  return (
    <Item.Group divided>
      <Item>
        <Item.Content>
          <Item.Header
            as="a"
            href={url}
            target="_blank"
          >
            { `${name} ` }
            <sup>
              { isPrivate ? <Icon name="lock" /> : null }
            </sup>
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
              disabled={!url}
              href={url}
            >
                View on github
              <Icon name="right chevron" />
            </Button>
            <Button
              primary
              floated="right"
              // disabled={viewerHasStarred}
              onClick={() => {
                const result = !viewerHasStarred
                  ? addStar(id).then(updateStarState)
                  : removeStar(id).then(updateStarState);

                result.catch(e => toast(e.message));
              }}
            >
              {
                repository.viewerHasStarred
                  ? 'Unstar'
                  : 'Star'
              }
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

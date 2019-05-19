/* eslint jsx-a11y/label-has-for: off */
import React from 'react';
import PropTypes from 'prop-types';

import {
  Button, Icon, Label, Item,
} from 'semantic-ui-react';

const RepositoryInfo = (props) => {
  const {
    addStar,
    removeStar,
    viewingRepo: { repository },
    updateStarState,
  } = props;

  const {
    url,
    name,
    isPrivate,
    viewerHasStarred,
    id,
    description,
    primaryLanguage,
    repositoryTopics: { nodes: topics },
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
            <span className="cinema">{ description }</span>
          </Item.Meta>
          <Item.Description>
            Primary language:
            {' '}
            { (primaryLanguage && primaryLanguage.name) || 'none' }
          </Item.Description>
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
              onClick={() => (!viewerHasStarred
                ? addStar(id).then(updateStarState)
                : removeStar(id).then(updateStarState))
              }
            >
              {
                repository.viewerHasStarred
                  ? 'Unstar '
                  : 'Star '
              }
              <Icon corner="top right" name="star" />
            </Button>
            {
              topics.map(({ topic }) => (
                <Label key={topic.id}>{ topic.name }</Label>
              ))
            }
          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  );
};

RepositoryInfo.propTypes = {
  addStar: PropTypes.func.isRequired,
  removeStar: PropTypes.func.isRequired,
  updateStarState: PropTypes.func.isRequired,
  viewingRepo: PropTypes.shape(Object).isRequired,
};

export default RepositoryInfo;

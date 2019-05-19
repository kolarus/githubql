import React from 'react';
import { List as ListUI, Placeholder } from 'semantic-ui-react';
import { REPOS_PER_PAGE } from '../../../../constants/constants';

const ListPlaceholder = () => (
  <ListUI divided relaxed verticalAlign="middle">
    {
        [...Array(REPOS_PER_PAGE)].map((e, i) => (
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

export default ListPlaceholder;

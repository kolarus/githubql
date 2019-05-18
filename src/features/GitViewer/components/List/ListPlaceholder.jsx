import React from 'react';
import { List as ListUI, Placeholder } from 'semantic-ui-react';

const ListPlaceholder = () => (
  <ListUI divided relaxed verticalAlign="middle">
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

export default ListPlaceholder;

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Button, Icon, Input } from 'semantic-ui-react';
import style from './unauthorized.module.scss';

import { setToken } from '../../utils/token-helper';

const Unauthorized = (props) => {
  const { history } = props;
  const [tokenValue, setTokenValue] = useState('');

  return (
    <div className={style.msg}>
      <h1>Please provide valid github personal access token!</h1>
      <h3>
                See
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/kolarus/githubql/blob/master/README.md"
        >
                    README
        </a>
          for more info or provide you token for current session via input below and click unlock
      </h3>
      <Input
        icon={(
          <Icon
            name="unlock"
            onClick={() => {
              setToken(tokenValue);
              window.location.href = '/';
            }}
            inverted
            circular
            link
          />
        )}
        value={tokenValue}
        onChange={(e, { value }) => setTokenValue(value)}
        placeholder="Enter your token"
      />
      <Button
        className={style.button}
        primary
        onClick={() => history.goBack()}
      >
        <Icon name="left chevron" />
                Go back
      </Button>
    </div>
  );
};

Unauthorized.propTypes = {
  history: PropTypes.shape(Object).isRequired,
};

export default Unauthorized;

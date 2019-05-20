import React, { useState } from 'react';

import { Icon, Input } from 'semantic-ui-react';

import { setToken } from '../../utils/tokenHelper';
import tokenValidation from '../../utils/tokenValidation';

import style from './unauthorized.module.scss';


const Unauthorized = () => {
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
        onChange={(e, { value }) => {
          setTokenValue(value
            ? tokenValidation(value) || tokenValue
            : '');
        }}
        placeholder="Enter your token"
      />
    </div>
  );
};

export default Unauthorized;

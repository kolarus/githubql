import React from 'react';

import { Button, Icon } from 'semantic-ui-react';
import style from './unauthorized.module.scss';

const Unauthorized = (props) => {
  const { history } = props;
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
                for more info
      </h3>
      <Button
        primary
        onClick={() => history.goBack()}
      >
        <Icon name="left chevron" />
                Go back
      </Button>
    </div>
  );
};

export default Unauthorized;

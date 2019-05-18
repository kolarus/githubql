import React from 'react';
import { Link } from 'react-router-dom';

const UnauthorizeedToast = () => (
  <React.Fragment>
    Please provide valid github personal access token! See
    {' '}
    <a
      target="_blank"
      rel="noreferrer"
      href="https://github.com/kolarus/githubql/blob/master/README.md"
    >
        README
    </a>
    {' '}
    for more info
  </React.Fragment>
);

export default UnauthorizeedToast;

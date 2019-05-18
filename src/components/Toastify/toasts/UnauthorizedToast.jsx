import React from 'react';
import { Link } from 'react-router-dom';

const UnauthorizeedToast = () => (
  <React.Fragment>
    Please provide valid github personal access token! See
    {' '}
    <Link to="https://github.com/kolarus/githubql/blob/master/README.md">README</Link>
    {' '}
    for more info
  </React.Fragment>
);

export default UnauthorizeedToast;

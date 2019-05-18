import React from 'react';

import style from '../Unauthorized/unauthorized.module.scss';

const Error = (props) => {
  const { error: networkError, location } = props;

  const error = location && location.state
    ? location.state.error
    : networkError;

  return (
    <div className={style.msg}>
      <h1>
        {
          error && error.statusCode
            ? error.statusCode
            : 'Error'
        }
      </h1>
      <h2>
        { error && error.message
          ? error.message
          : 'Something went wrong'}
      </h2>
    </div>
  );
};

export default Error;

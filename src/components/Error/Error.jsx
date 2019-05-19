import React from 'react';
import PropTypes from 'prop-types';

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

Error.propTypes = {
  error: PropTypes.shape(Object),
  location: PropTypes.shape(Object),
};

Error.defaultProps = {
  error: null,
  location: null,
};

export default Error;

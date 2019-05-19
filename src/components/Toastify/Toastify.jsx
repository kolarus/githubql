import React from 'react';

import { ToastContainer } from 'react-toastify';

import { TOASTIFY_TIMEOUT } from '../../constants/constants';

const Toastify = () => (
  <ToastContainer
    position="top-right"
    autoClose={TOASTIFY_TIMEOUT}
    hideProgressBar
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnVisibilityChange
    draggable
    pauseOnHover
  />
);

export default Toastify;

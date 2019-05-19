import React from 'react';

import { ToastContainer } from 'react-toastify';

import { toastifyTimeout } from '../../constants/constants';

const Toastify = () => (
  <ToastContainer
    position="top-right"
    autoClose={toastifyTimeout}
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

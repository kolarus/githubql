import React from 'react';

import { ToastContainer } from 'react-toastify';

import { toastifyAutoCloseTimeout } from '../../constants/constants';

const Toastify = () => (
  <ToastContainer
    position="top-right"
    autoClose={toastifyAutoCloseTimeout}
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

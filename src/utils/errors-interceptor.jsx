import React from 'react';
import { onError } from 'apollo-link-error';
import { toast } from 'react-toastify';
import UnauthorizedToast from '../components/Toastify/toasts/UnauthorizedToast';
import history from './history';


const unauthorizedError = onError(({ graphQLErrors, networkError }) => {
  if (networkError && networkError.statusCode === 401) {
    toast.error(<UnauthorizedToast />, {
      position: toast.POSITION.TOP_RIGHT,
    });
    history.push('/unauthorized');
    return;
  }

  history.push('/error', {
    error: networkError || graphQLErrors[0],
  });
});

export default unauthorizedError;

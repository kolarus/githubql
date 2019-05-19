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

  const error = networkError || graphQLErrors[0];
  history.push('/error', { error });

  toast.error(error.message);
});

export default unauthorizedError;

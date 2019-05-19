import { PAGINATION_DIRECTION } from '../constants/constants';


const getFetchDirection = (activePage, newActivePage) => {
  const { PREV, NEXT } = PAGINATION_DIRECTION;
  return (activePage - newActivePage) > 0
    ? PREV
    : NEXT;
};

export default getFetchDirection;

import PropTypes from 'prop-types';

export const paginationShape = {
  fetchDirection: PropTypes.string,
  activePage: PropTypes.number.isRequired,
  startCursor: PropTypes.string,
  endCursor: PropTypes.string,
  hasPreviousPage: PropTypes.bool,
  hasNextPage: PropTypes.bool,
};

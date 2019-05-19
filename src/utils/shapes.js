import PropTypes from 'prop-types';

export const paginationShape = {
  fetchDirection: PropTypes.string,
  activePage: PropTypes.number.isRequired,
  startCursor: PropTypes.string,
  endCursor: PropTypes.string,
  hasPreviousPage: PropTypes.bool,
  hasNextPage: PropTypes.bool,
};

export const viewerShape = {
  avatarUrl: PropTypes.string.isRequired,
  name: PropTypes.string,
  login: PropTypes.string.isRequired,
};

export const repositoryShape = {
  createdAt: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  id: PropTypes.string,
  isPrivate: PropTypes.bool,
  viewerHasStarred: PropTypes.bool,
  name: PropTypes.string,
  primaryLanguage: PropTypes.shape(Object),
  repositoryTopics: PropTypes.shape(Object),
};

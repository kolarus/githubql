export const TOASTIFY_TIMEOUT = 5000;

export const APP_TITLE = 'githubql - tech task';
export const GITHUB_BASE_URL = 'https://api.github.com/graphql';

export const PAGINATION_DIRECTION = {
  PREV: 'PREV',
  NEXT: 'NEXT',
};

export const REPOS_PER_PAGE = 3;

export const GITHUB_ACCESS_TOKEN = process.env && process.env.REACT_APP_GITHUB_ACCESS_TOKEN
  ? process.env.REACT_APP_GITHUB_ACCESS_TOKEN
  : '<YOUR_TOKEN_GOES_HERE>';

// put git token and al other stuff here
export const toastifyAutoCloseTimeout = 5000;

export const GITHUB_ACCESS_TOKEN = process.env && process.env.REACT_APP_GITHUB_ACCESS_TOKEN
  ? process.env.REACT_APP_GITHUB_ACCESS_TOKEN
  : '<YOUR_TOKEN_GOES_HERE>';

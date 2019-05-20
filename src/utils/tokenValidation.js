const tokenValidation = (token) => {
  const regexp = new RegExp('^[a-zA-Z0-9]*$');
  if (token.match(regexp)) {
    return token;
  }
  return '';
};

export default tokenValidation;

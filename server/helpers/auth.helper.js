const getTokenStringFromHeader = (headers) => {
  if (
    headers
    && headers.authorization
    && headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return headers.authorization.split(' ')[1];
  }

  return undefined;
};

export { getTokenStringFromHeader };

const getErrorMessage = (err) => {
  let message = '';

  if (!err.errors) return message;

  const error = Object.values(err.errors)[0];

  if (error.message) {
    message = error.message;
  } else {
    message = error;
  }

  return message;
};

export { getErrorMessage };

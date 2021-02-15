const getFieldName = (srt) => srt.substring(
  srt.lastIndexOf('index: ') + 7,
  srt.lastIndexOf('_1'),
);

const getUniqueErrorMessage = (err) => {
  let output;

  try {
    const fieldName = getFieldName(err.message);

    output = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} already exists`;
  } catch (ex) {
    output = 'Unique field already exists';
  }

  return output;
};

const getErrorMessage = (err) => {
  let message = '';

  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        return getUniqueErrorMessage(err);
      default:
        message = 'Something went wrong';
    }
  }

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

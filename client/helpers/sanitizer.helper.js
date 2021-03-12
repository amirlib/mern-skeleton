import validator from 'validator';

const sanitizeValue = (key, value) => {
  if (key === 'profilePicture') return value;

  return validator.escape(value.trim());
};

const sanitize = (values) => {
  const sanitizedValues = {};
  const pairs = Object.entries(values);

  pairs.forEach((pair) => {
    Object.defineProperty(
      sanitizedValues,
      pair[0],
      {
        configurable: true,
        enumerable: true,
        value: sanitizeValue(pair[0], pair[1]),
        writable: true,
      },
    );
  });

  return values;
};

export { sanitize };

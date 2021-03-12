import validator from 'validator';

const sanitizeValue = (value, type) => {
  if (type === 'file') return value;

  return validator.escape(value.trim());
};

const sanitize = (values, schema) => {
  const sanitizedValues = {};
  const pairs = Object.entries(values);

  pairs.forEach((pair) => {
    Object.defineProperty(
      sanitizedValues,
      pair[0],
      {
        configurable: true,
        enumerable: true,
        value: sanitizeValue(pair[1], schema[pair[0]].type),
        writable: true,
      },
    );
  });

  return values;
};

export { sanitize };

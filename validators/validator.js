import { validateFileBrowser } from './file.validator';
import { validateString } from './string.validator';
import InvalidFileError from './Errors/InvalidFileError';
import InvalidFieldValueError from './Errors/InvalidFieldValueError';

const validate = (value, attributes) => {
  if (attributes.type === 'file') {
    validateFileBrowser(
      value,
      attributes,
    );
  } else {
    validateString(
      value,
      attributes,
    );
  }
};

const validateValues = (sanitizedValues, schema) => {
  const pairs = Object.entries(sanitizedValues);

  try {
    pairs.forEach((pair) => {
      validate(pair[1], schema[pair[0]]);
    });

    return { sanitizedValues };
  } catch (err) {
    if (err instanceof InvalidFileError || err instanceof InvalidFieldValueError) {
      return { error: `${err.fieldName} ${err.message}` };
    }

    return { error: 'Error has occurred' };
  }
};

export { validateValues };

import { validateImageFileBrowser } from './file.validator';
import { validateTextField } from './textField.validator';
import InvalidFileError from './Errors/InvalidFileError';
import InvalidTextField from './Errors/InvalidTextField';

const validate = (value, attributes) => {
  if (attributes.type === 'file') {
    validateImageFileBrowser(
      value,
      attributes,
    );
  } else {
    validateTextField(
      value,
      attributes,
    );
  }
};

const validateValues = (values, schema) => {
  const pairs = Object.entries(values);

  try {
    pairs.forEach((pair) => {
      validate(pair[1], schema[pair[0]]);
    });

    return { isValid: true };
  } catch (err) {
    if (err instanceof InvalidFileError || err instanceof InvalidTextField) {
      return { error: `${err.fieldName} ${err.message}` };
    }

    return { error: 'Error has occurred' };
  }
};

export default validateValues;

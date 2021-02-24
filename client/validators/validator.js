import { validateImageFileBrowser } from '../../validators/file.validator';
import { validateTextField } from '../../validators/textField.validator';
import InvalidFileError from '../../validators/Errors/InvalidFileError';
import InvalidTextField from '../../validators/Errors/InvalidTextField';

const validate = (pair, attributes) => {
  if (pair[0] === 'profilePicture') {
    validateImageFileBrowser(
      pair[1], // value
      attributes,
    );
  } else {
    validateTextField(
      pair[1], // value
      attributes,
    );
  }
};

const validateValues = (values, model) => {
  const pairs = Object.entries(values);

  try {
    pairs.forEach((pair) => {
      validate(pair, model[pair[0]]);
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

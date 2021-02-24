import validator from 'validator';
import InvalidTextField from './Errors/InvalidTextField';

const isValidEmail = (value) => {
  if (validator.isEmail(value)) return true;

  return false;
};

const isValidLength = (value, maxlength, minlength) => {
  if (validator.isLength(
    value,
    {
      max: maxlength,
      min: minlength,
    },
  )) return true;

  return false;
};

const defaultOptions = {
  isEmail: false,
  maxlength: undefined,
  minlength: 0,
  required: false,
};

const validateTextField = (value, attributes) => {
  const { fieldName, options = defaultOptions } = attributes;
  const {
    isEmail,
    maxlength,
    minlength,
    required,
  } = options;

  if (!value) {
    if (required) throw new InvalidTextField('ERR_FIELD_EMPTY', fieldName);

    return;
  }

  if (!isValidLength(value, maxlength, minlength)) {
    throw new InvalidTextField('ERR_FIELD_LENGTH', fieldName);
  }

  if (isEmail && !isValidEmail(value)) {
    throw new InvalidTextField('ERR_INVALID_EMAIL', fieldName);
  }
};

export { validateTextField };

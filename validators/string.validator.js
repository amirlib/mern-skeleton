import validator from 'validator';
import InvalidFieldValueError from './Errors/InvalidFieldValueError';

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

const validateString = (value, attributes) => {
  const { fieldName, options = defaultOptions } = attributes;
  const {
    isEmail,
    maxlength,
    minlength,
    required,
  } = options;

  if (!value) {
    if (required) throw new InvalidFieldValueError('ERR_FIELD_EMPTY', fieldName);

    return;
  }

  if (!isValidLength(value, maxlength, minlength)) {
    throw new InvalidFieldValueError('ERR_FIELD_LENGTH', fieldName);
  }

  if (isEmail && !isValidEmail(value)) {
    throw new InvalidFieldValueError('ERR_INVALID_EMAIL', fieldName);
  }
};

export { validateString };

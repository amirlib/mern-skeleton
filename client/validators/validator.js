import validator from 'validator';

const defaultOptions = {
  isEmail: false,
  maxlength: undefined,
  minlength: 0,
  required: false,
};

const validate = (fieldName, value, options = defaultOptions) => {
  if (!value) {
    if (options.required) {
      return { error: `${fieldName} is required` };
    }

    return { valid: true };
  }

  if (!validator.isLength(
    value,
    {
      max: options.maxlength,
      min: options.minlength,
    },
  )) {
    return { error: `${fieldName} must be between ${options.minlength} and ${options.maxlength} characters` };
  }

  if (options.isEmail) {
    if (!validator.isEmail(value)) return { error: `${fieldName} is not valid` };
  }

  return { valid: true };
};

export default validate;

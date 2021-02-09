import validator from 'validator';

const defaultOptions = {
  maxlength: undefined,
  minlength: 0,
  required: false,
};

const customValidator = (fieldName, value, options = defaultOptions) => {
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

  return { valid: true };
};

const emailValidator = (fieldName, email, options = defaultOptions) => {
  const res = customValidator(fieldName, email, options);

  if (res.error) return res;

  if (!validator.isEmail(email)) return { error: `${fieldName} is not valid` };

  return { valid: true };
};

export { customValidator, emailValidator };

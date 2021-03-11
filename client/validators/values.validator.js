import validator from 'validator';
import validateValues from '../../validators/validator';
import userSchema from '../../schema/user.schema';

const sanitize = (key, value) => validator.escape(value.trim());

const sanitizeValues = (values) => {
  const sanitizedValues = {};
  const pairs = Object.entries(values);

  pairs.forEach((pair) => {
    Object.defineProperty(
      sanitizedValues,
      pair[0],
      {
        configurable: true,
        enumerable: true,
        value: sanitize(pair[0], pair[1]),
        writable: true,
      },
    );
  });

  return values;
};

const profileModel = {
  ...userSchema,
  email: {
    ...userSchema.email,
    options: {
      ...userSchema.email.options,
      required: false,
    },
  },
  name: {
    ...userSchema.name,
    options: {
      ...userSchema.name.options,
      required: false,
    },
  },
  password: {
    ...userSchema.password,
    options: {
      ...userSchema.password.options,
      required: false,
    },
  },
};

const validateProfile = (values) => validateValues(values, profileModel);
const validateUser = (values) => validateValues(values, userSchema);

export {
  sanitizeValues,
  validateProfile,
  validateUser,
};

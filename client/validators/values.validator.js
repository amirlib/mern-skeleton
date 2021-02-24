import validator from 'validator';
import validateValues from './validator';
import userModel from '../user/user.model';

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
  ...userModel,
  email: {
    ...userModel.email,
    options: {
      ...userModel.email.options,
      required: false,
    },
  },
  name: {
    ...userModel.name,
    options: {
      ...userModel.name.options,
      required: false,
    },
  },
  password: {
    ...userModel.password,
    options: {
      ...userModel.password.options,
      required: false,
    },
  },
};

const validateProfile = (values) => validateValues(values, profileModel);
const validateUser = (values) => validateValues(values, userModel);

export {
  sanitizeValues,
  validateProfile,
  validateUser,
};

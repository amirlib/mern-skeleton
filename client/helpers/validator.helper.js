import { sanitize } from './sanitizer.helper';
import userSchema from '../schema/user.schema';
import { validateValues } from '../../validators/validator';

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

const validate = (values, schema) => {
  const sanitizedValues = sanitize(values, schema);

  return validateValues(sanitizedValues, schema);
};

const validateProfile = (values) => validate(values, profileModel);
const validateUser = (values) => validate(values, userSchema);

export { validateProfile, validateUser };

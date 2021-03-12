import validateValues from '../../validators/validator';
import userSchema from '../schema/user.schema';

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

export { validateProfile, validateUser };

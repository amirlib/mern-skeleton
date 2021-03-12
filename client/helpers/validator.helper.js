import { sanitize } from './sanitizer.helper';
import { profileSchema, userSchema } from '../schema/user.schema';
import { validateValues } from '../../validators/validator';

const validate = (values, schema) => {
  const sanitizedValues = sanitize(values, schema);

  return validateValues(sanitizedValues, schema);
};

const validateProfile = (values) => validate(values, profileSchema);
const validateUser = (values) => validate(values, userSchema);

export { validateProfile, validateUser };

import validator from 'validator';
import validate from './validator';

const profileSanitizer = (values) => ({
  email: validator.escape(values.email.trim()) || undefined,
  name: validator.escape(values.name.trim()) || undefined,
  password: validator.escape(values.password.trim()) || undefined,
});

const profileValidator = (values) => {
  const emailRes = validate(
    'Email',
    values.email,
    {
      isEmail: true,
      maxlength: 255,
      minlength: 7,
      required: false,
    },
  );

  if (emailRes.error) return emailRes;

  const nameRes = validate(
    'Name',
    values.name,
    {
      maxlength: 255,
      minlength: 2,
      required: false,
    },
  );

  if (nameRes.error) return nameRes;

  const passwordRes = validate(
    'Password',
    values.password,
    {
      maxlength: 20,
      minlength: 5,
      required: false,
    },
  );

  if (passwordRes.error) return passwordRes;

  return { valid: true };
};

export { profileSanitizer, profileValidator };

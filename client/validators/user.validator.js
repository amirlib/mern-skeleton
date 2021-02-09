import { customValidator, emailValidator } from './fields.validator';

const userValidator = (values) => {
  const emailRes = emailValidator(
    'Email',
    values.email,
    {
      maxlength: 255,
      minlength: 7,
      required: true,
    },
  );

  if (emailRes.error) return emailRes;

  const nameRes = customValidator(
    'Name',
    values.name,
    {
      maxlength: 255,
      minlength: 2,
      required: true,
    },
  );

  if (nameRes.error) return nameRes;

  const passwordRes = customValidator(
    'Password',
    values.password,
    {
      maxlength: 20,
      minlength: 5,
      required: true,
    },
  );

  if (passwordRes.error) return passwordRes;

  return { valid: true };
};

export default userValidator;

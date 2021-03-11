const userSchema = {
  email: {
    fieldName: 'Email',
    options: {
      isEmail: true,
      maxlength: 255,
      minlength: 7,
      required: true,
    },
  },
  name: {
    fieldName: 'Name',
    options: {
      maxlength: 255,
      minlength: 2,
      required: true,
    },
  },
  password: {
    fieldName: 'Password',
    options: {
      maxlength: 20,
      minlength: 5,
      required: true,
    },
  },
};

export default userSchema;

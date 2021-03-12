// Available types: file, string

const userSchema = {
  email: {
    fieldName: 'Email',
    options: {
      isEmail: true,
      maxlength: 255,
      minlength: 7,
      required: true,
    },
    type: 'string',
  },
  name: {
    fieldName: 'Name',
    options: {
      maxlength: 255,
      minlength: 2,
      required: true,
    },
    type: 'string',
  },
  password: {
    fieldName: 'Password',
    options: {
      maxlength: 20,
      minlength: 5,
      required: true,
    },
    type: 'string',
  },
  profilePicture: {
    fieldName: 'Profile picture',
    options: {
      extensions: ['jpg', 'jpeg', 'png'],
      maxSize: 1048576,
      minSize: 1,
      required: false,
      types: ['image/jpeg', 'image/pjpeg', 'image/png'],
    },
    type: 'file',
  },
};

export default userSchema;

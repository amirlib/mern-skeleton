/* eslint-disable prefer-destructuring */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: {
      lowercase: true,
      match: [/.+@.+\..+/, 'Email value not a valid email address'],
      maxlength: [255, 'Email length is not between the valid range'],
      minlength: [7, 'Email length is not between the valid range'],
      required: 'Email is required',
      trim: true,
      type: String,
    },
    name: {
      maxlength: [255, 'Name length is not between the valid range'],
      minlength: [2, 'Name length is not between the valid range'],
      required: 'Name is required',
      trim: true,
      type: String,
    },
    password: {
      required: 'Password is required',
      type: String,
    },
    profilePictureId: {
      type: String,
    },
    tokens: [{
      token: {
        type: String,
      },
    }],
  },
  {
    timestamps: true,
  },
);

UserSchema.methods.authenticate = async function (plainText) {
  const user = this;

  return await bcrypt.compare(plainText, user.password);
};

UserSchema.methods.encryptPassword = async function (password) {
  if (!password) return '';

  return await bcrypt.hash(password, 10);
};

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
  );

  user.tokens = user.tokens.concat({ token });

  await user.save();

  return token;
};

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.__v;
  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

UserSchema.methods.updateValues = function (values) {
  if (!values) return;

  const user = this;
  const pairs = Object.entries(values);

  pairs.forEach((pair) => {
    if (pair[0] !== 'profilePicture') {
      user[pair[0]] = pair[1];
    }
  });
};

UserSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  if (user.password.length < 6) {
    throw this.invalidate('password', 'Password must be at least 6 characters');
  }

  this.password = await this.encryptPassword(user.password);

  return next();
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;

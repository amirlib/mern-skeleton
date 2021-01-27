import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import variables from '../../environment/variables';

const UserSchema = new mongoose.Schema(
  {
    email: {
      match: [/.+@.+\..+/, 'Please fill a valid email address'],
      required: 'Email is required',
      trim: true,
      type: String,
      unique: 'Email already exists',
    },
    name: {
      required: 'Name is required',
      trim: true,
      type: String,
    },
    password: {
      required: 'Password is required',
      type: String,
    },
    tokens: [{
      token: {
        type: String,
      },
    }],
    salt: String,
  },
  {
    timestamps: true,
  },
);

UserSchema.methods.authenticate = function (plainText) {
  return this.encryptPassword(plainText) === this.password;
};

UserSchema.methods.encryptPassword = function (password) {
  if (!password) return '';

  try {
    return crypto
      .createHmac('sha1', this.salt)
      .update(password)
      .digest('hex');
  } catch (err) {
    return '';
  }
};

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id },
    variables.jwtSecret,
  );

  user.tokens = user.tokens.concat({ token });

  await user.save();

  return token;
};

UserSchema.methods.makeSalt = function () {
  return `${Math.round((new Date().valueOf() * Math.random()))} `;
};

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.salt;

  return userObject;
};

UserSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) return next();
  if (user.password.length < 6) {
    throw this.invalidate('password', 'Password must be at least 6 characters');
  }

  this.salt = this.makeSalt();
  this.password = this.encryptPassword(user.password);

  return next();
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;

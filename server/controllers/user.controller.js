import extend from 'lodash/extend';
import User from '../models/user.model';
import { getErrorMessage } from '../helpers/dbErrorHandler';

const create = async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const user = await User.findOne({ email: email.trim().toLowerCase() });

    if (user) {
      return res
        .status(400)
        .json({ error: 'Email already registered' });
    }

    const newUser = new User({
      email,
      name,
      password,
    });

    await newUser.save();

    return res
      .status(201)
      .json({ message: 'Register success' });
  } catch (err) {
    return res
      .status(400)
      .json({ error: getErrorMessage(err) });
  }
};

const list = async (req, res) => {
  try {
    const users = await User.find().select('name email createdAt');

    return res.json(users);
  } catch (err) {
    return res.status(400).json({ error: getErrorMessage(err) });
  }
};

const read = (req, res) => res.json(req.profile);

const remove = async (req, res) => {
  try {
    const user = req.profile;
    const deletedUser = await user.remove();

    return res.json(deletedUser);
  } catch (err) {
    return res.status(400).json({ error: getErrorMessage(err) });
  }
};

const update = async (req, res) => {
  try {
    let user = req.profile;

    user = extend(user, req.body);

    await user.save();

    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: getErrorMessage(err) });
  }
};

const userByCredentials = async (req, res, next) => {
  try {
    const user = await User.findById(req.auth._id);

    if (!user) throw new Error();

    req.profile = user;

    return next();
  } catch (e) {
    return res.status(401).send({ error: 'Please authenticate.' });
  }
};

const userById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);

    if (!user) return res.status('400').json({ error: 'User not found' });

    req.profile = user;

    return next();
  } catch (err) {
    return res.status('400').json({ error: 'Could not retrieve user' });
  }
};

export {
  create,
  list,
  read,
  remove,
  update,
  userByCredentials,
  userById,
};

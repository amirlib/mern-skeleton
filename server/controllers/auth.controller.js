import expressJwt from 'express-jwt';
import { getTokenStringFromHeader } from '../helpers/auth.helper';
import User from '../models/user.model';

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status('401')
        .json({ error: 'User not found' });
    }
    const isAuthenticated = await user.authenticate(req.body.password);

    if (!isAuthenticated) {
      return res
        .status('401')
        .send({ error: 'Email and password do not match' });
    }

    const token = await user.generateAuthToken();

    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    return res
      .status('401')
      .json({ error: 'Could not login' });
  }
};

const logout = async (req, res) => {
  try {
    const token = getTokenStringFromHeader(req.headers);

    req.profile.tokens = req.profile.tokens.filter(
      (t) => t.token !== token,
    );

    await req.profile.save();

    return res.status('200').json({ message: 'logged out' });
  } catch (e) {
    console.log(e);

    return res.status('500').send();
  }
};

const logoutAll = async (req, res) => {
  try {
    req.profile.tokens = [];

    await req.profile.save();

    return res.status('200').json({ message: 'logged out' });
  } catch (e) {
    console.log(e);

    return res.status('500').send();
  }
};

const requireLogin = expressJwt({
  algorithms: ['HS256'],
  secret: process.env.JWT_SECRET,
  userProperty: 'auth',
});

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id.toString() === req.auth._id;

  if (!authorized) return res.status('403').json({ error: 'User is not authorized' });

  return next();
};

export {
  login,
  logout,
  logoutAll,
  requireLogin,
  hasAuthorization,
};

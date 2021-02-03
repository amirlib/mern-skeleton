import { getUserByCookies } from '../helpers/auth.helper';
import User from '../models/user.model';

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status('401')
        .json({ error: 'Account not exists or Email and Password do not match' });
    }

    const isAuthenticated = await user.authenticate(req.body.password);

    if (!isAuthenticated) {
      return res
        .status('401')
        .send({ error: 'Account not exists or Email and Password do not match' });
    }

    const token = await user.generateAuthToken();

    res.cookie(
      't',
      token,
      { httpOnly: true },
    );

    return res
      .status(200)
      .json({ _id: user._id });
  } catch (err) {
    return res
      .status('401')
      .json({ error: 'Could not login' });
  }
};

const logout = async (req, res) => {
  try {
    req.profile.tokens = req.profile.tokens.filter(
      (token) => token.token !== req.cookies.t,
    );

    await req.profile.save();

    res.clearCookie('t');

    return res.status(200).json({ message: 'logged out' });
  } catch (e) {
    console.log(e);

    return res.status(500).send();
  }
};

const logoutAll = async (req, res) => {
  try {
    req.profile.tokens = [];

    await req.profile.save();

    res.clearCookie('t');

    return res.status(200).json({ message: 'logged out' });
  } catch (e) {
    console.log(e);

    return res.status(500).send();
  }
};

const requireLogin = async (req, res, next) => {
  const user = await getUserByCookies(req.cookies);

  if (Object.keys(user).length === 0) return res.status('403').send({ error: 'User is not authorized' });

  req.profile = user;

  return next();
};

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile
    && req.user
    && req.profile._id.toString() === req.user._id.toString();

  if (!authorized) return res.status('403').json({ error: 'User is not authorized' });

  return next();
};

const verify = async (req, res) => {
  const user = await getUserByCookies(req.cookies);

  if (Object.keys(user).length === 0) return res.status('422').send({ error: 'User not found' });

  return res.status('200').json({ user });
};

export {
  hasAuthorization,
  login,
  logout,
  logoutAll,
  requireLogin,
  verify,
};

import jwt from 'jsonwebtoken';
import User from '../models/user.model';

const getUserByCookies = async (cookies) => {
  if (!cookies || !cookies.t) return {};

  const decoded = jwt.verify(cookies.t, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);

  if (!user) return {};

  return user;
};

export { getUserByCookies };

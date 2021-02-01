import jwt from 'jsonwebtoken';
import User from '../models/user.model';

const getTokenStringFromHeader = (headers) => {
  if (
    headers
    && headers.authorization
    && headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return headers.authorization.split(' ')[1];
  }

  return undefined;
};

const getUserByCookies = async (cookies) => {
  if (!cookies || !cookies.token) return {};

  const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);

  const user = await User.findById(decoded);

  if (!user) return {};

  return user;
};

export { getTokenStringFromHeader, getUserByCookies };

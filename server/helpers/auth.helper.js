import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import variables from '../../environment/variables';

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

  const decoded = jwt.verify(cookies.token, variables.jwtSecret);

  const user = await User.findById(decoded);

  if (!user) return {};

  return user;
};

export { getTokenStringFromHeader, getUserByCookies };

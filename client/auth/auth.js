import { loginRequest, logoutRequest, verifyRequest } from './auth-api';
import { clear, get, save } from './auth-helper';

const login = async (user) => {
  try {
    const res = await loginRequest(user);

    if (res.error) return res;

    save({ _id: res._id });

    return res;
  } catch (err) {
    return { error: 'Error has occurred. Please try again or contact for support.' };
  }
};

const logout = async (isLogoutFromAll = false) => {
  try {
    await logoutRequest(isLogoutFromAll);
  } finally {
    clear();
  }
};

const logoutAll = async () => await logout(true);

const verify = async () => {
  try {
    const res = await verifyRequest();

    if (res.error) {
      clear();
    } else {
      const local = get();

      if (local._id !== res._id) save({ _id: res._id });
    }

    return res;
  } catch (err) {
    return { error: 'Error has occurred.' };
  }
};

export {
  login,
  logout,
  logoutAll,
  verify,
};

import { loginRequest, logoutRequest } from './auth-api';
import { clearAuthFromLocalStorage, saveAuthToLocalStorage } from './auth-helper';

const login = async (user) => {
  try {
    const res = await loginRequest(user);

    if (res.error) return res;

    return saveAuthToLocalStorage(res);
  } catch (err) {
    return { error: 'Error has occurred. Please try again or contact for support.' };
  }
};

const logout = async (token, isLogoutFromAll = false) => {
  try {
    return await logoutRequest(token, isLogoutFromAll);
  } catch (err) {
    return undefined;
  } finally {
    clearAuthFromLocalStorage();
  }
};

const logoutAll = async (token) => await logout(token, true);

export { login, logout, logoutAll };

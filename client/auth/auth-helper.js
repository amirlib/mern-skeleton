import { deleteCookie, getCookie, setCookie } from './cookies-helper';

const clearJwt = () => {
  if (typeof window !== 'undefined') localStorage.removeItem('user');
  if (typeof document !== 'undefined') deleteCookie('token');
};

const getJwt = () => {
  if (typeof window === 'undefined') return {};
  if (typeof document === 'undefined') return {};

  if (getCookie('token')) {
    return {
      token: getCookie('token'),
      user: JSON.parse(localStorage.getItem('user')),
    };
  }

  return {};
};

const saveJwt = (jwt) => {
  if (typeof document !== 'undefined') setCookie('token', jwt.token, { path: '/' });
  if (typeof window !== 'undefined') {
    localStorage.setItem(
      'user',
      JSON.stringify(jwt.user),
    );
  }
};

export { clearJwt, getJwt, saveJwt };

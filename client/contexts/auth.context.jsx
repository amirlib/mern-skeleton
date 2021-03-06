import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import * as auth from '../auth/auth';
import { get } from '../auth/auth-helper';

const AuthContext = createContext({
  isUserLoggedIn: () => false,
  login: () => ({ error: 'User not found' }),
  user: {},
  verify: () => false,
});

const AuthProvider = (props) => {
  const { children, userProp } = props;
  const [user, setUser] = useState(userProp);

  const setEmptyUser = () => setUser({});

  const isUserLoggedIn = () => {
    const data = get();

    if (data.user || Object.keys(user).length > 0) return true;

    return false;
  };

  const login = async (data) => {
    const res = await auth.login(data);

    if (res.error) return res;

    setUser(res);

    return undefined;
  };

  const logout = async () => {
    await auth.logout();

    setEmptyUser();
  };

  const logoutAll = async () => {
    await auth.logoutAll();

    setEmptyUser();
  };

  const verify = async () => {
    const res = await auth.verify();

    if (res.error) {
      setEmptyUser();

      return false;
    }

    if (res._id.toString() !== user._id.toString()) setUser(res);

    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        isUserLoggedIn,
        login,
        logout,
        logoutAll,
        setEmptyUser,
        user,
        verify,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.shape({}).isRequired,
  userProp: PropTypes.shape({}).isRequired,
};

export { AuthContext, AuthProvider };

import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import * as auth from '../auth/auth';
import { getJwt } from '../auth/auth-helper';

const AuthContext = createContext({
  isUserLoggedIn: () => false,
  user: {},
});

const AuthProvider = (props) => {
  const { children, userProp } = props;
  const [user, setUser] = useState(userProp);

  const setEmptyUser = () => setUser({});

  const isUserLoggedIn = () => {
    const jwt = getJwt();

    if (jwt.token || Object.keys(user).length > 0) return true;

    return false;
  };

  const login = async (data) => {
    const res = await auth.login(data);

    if (res && res.error) {
      setEmptyUser();
    } else {
      const jwt = getJwt();

      setUser(jwt.user);
    }

    return res;
  };

  const logout = async () => {
    const jwt = getJwt();

    if (jwt && jwt.token) await auth.logout(jwt.token);

    setEmptyUser();
  };

  const logoutAll = async () => {
    const jwt = getJwt();

    if (jwt && jwt.token) await auth.logoutAll(jwt.token);

    setEmptyUser();
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

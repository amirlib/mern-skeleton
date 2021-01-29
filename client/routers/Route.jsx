import React, { useEffect, useState } from 'react';
import { Redirect, Route as LibraryRoute, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isAuthenticated } from '../auth/auth-helper';

const Route = (props) => {
  const location = useLocation();
  const [redirect, setRedirect] = useState(false);
  const {
    Component,
    exact,
    path,
    requireLogin,
    redirectPath,
  } = props;

  useEffect(() => {
    let loggedIn = false;
    const jwt = isAuthenticated();

    if (jwt) loggedIn = true;

    if (requireLogin) {
      setRedirect(!loggedIn);
    } else {
      setRedirect(false);
    }
  });
  console.log(`Route => path: ${path}, redirect: ${redirect}`);
  return (
    <>
      <LibraryRoute
        exact={exact}
        path={path}
        render={(props) => (
          redirect
            ? (
              <Redirect
                to={{
                  pathname: redirectPath,
                  state: { from: location },
                }}
              />
            ) : (
              <Component {...props} />
            )
        )}
      />
    </>
  );
};

Route.propTypes = {
  Component: PropTypes.func.isRequired,
  exact: PropTypes.bool,
  path: PropTypes.string.isRequired,
  requireLogin: PropTypes.bool,
  redirectPath: PropTypes.string,
};

Route.defaultProps = {
  exact: false,
  requireLogin: false,
  redirectPath: '',
};

export default Route;

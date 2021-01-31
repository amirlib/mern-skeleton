import React, { useContext } from 'react';
import { Redirect, Route as LibraryRoute, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthContext } from '../contexts/auth.context';

const Route = (props) => {
  const location = useLocation();
  const { isUserLoggedIn } = useContext(AuthContext);
  const {
    Component,
    exact,
    path,
    requireLogin,
    redirectPath,
  } = props;

  const shouldRedirect = () => {
    if (requireLogin) return !isUserLoggedIn();

    return false;
  };

  return (
    <>
      <LibraryRoute
        exact={exact}
        path={path}
        render={(componentProps) => (
          shouldRedirect()
            ? (
              <Redirect
                to={{
                  pathname: redirectPath,
                  state: { from: location },
                }}
              />
            ) : (
              <Component {...componentProps} />
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

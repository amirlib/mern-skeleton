import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../auth/auth-helper';

const PrivateRoute = (props) => {
  const location = useLocation();
  const { component, path } = props;

  return (
    <>
      {
        isAuthenticated()
          ? (
            <Route
              component={component}
              path={path}
            />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          )
      }
    </>
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

export default PrivateRoute;

import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import { withRouter } from 'react-router-dom';
import MenuButton from './MenuButton';
import MenuIconLink from './MenuIconLink';
import MenuLink from './MenuLink';
import { logout } from '../../auth/auth';
import { isAuthenticated } from '../../auth/auth-helper';

const Menu = withRouter(({ history }) => {
  const [LoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const jwt = isAuthenticated();

    if (jwt) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  const logoutClick = async () => {
    const jwt = isAuthenticated();

    if (!jwt || jwt.token === undefined) return history.push('/');

    await logout(jwt.token);

    return history.push('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          color="inherit"
          variant="h6"
        >
          MERN Skeleton
        </Typography>

        <MenuIconLink
          display
          iconComponent={<HomeIcon />}
          label="Home"
          path="/"
        />

        <MenuLink
          display={!LoggedIn}
          path="/login"
          text="Login"
        />

        <MenuLink
          display={!LoggedIn}
          path="/signup"
          text="Sign up"
        />

        <MenuLink
          display={LoggedIn}
          path="/users"
          text="Users"
        />

        <MenuLink
          display={LoggedIn}
          path={isAuthenticated() ? `/user/${isAuthenticated().user._id}` : ''}
          text="My Profile"
        />

        <MenuButton
          display={LoggedIn}
          onClick={logoutClick}
          text="Logout"
        />
      </Toolbar>
    </AppBar>
  );
});

export default Menu;

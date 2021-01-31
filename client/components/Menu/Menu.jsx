import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import { withRouter } from 'react-router-dom';
import MenuButton from './MenuButton';
import MenuIconLink from './MenuIconLink';
import MenuLink from './MenuLink';
import { AuthContext } from '../../contexts/auth.context';

const Menu = withRouter(({ history }) => {
  const { isUserLoggedIn, logout, user } = useContext(AuthContext);

  const logoutClick = async () => {
    if (isUserLoggedIn()) await logout();

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
          display={!isUserLoggedIn()}
          path="/login"
          text="Login"
        />

        <MenuLink
          display={!isUserLoggedIn()}
          path="/signup"
          text="Sign up"
        />

        <MenuLink
          display={isUserLoggedIn()}
          path="/users"
          text="Users"
        />

        <MenuLink
          display={isUserLoggedIn()}
          path={isUserLoggedIn() ? `/user/${user._id}` : ''}
          text="My Profile"
        />

        <MenuButton
          display={isUserLoggedIn()}
          onClick={logoutClick}
          text="Logout"
        />
      </Toolbar>
    </AppBar>
  );
});

export default Menu;

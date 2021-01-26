import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import { Link, withRouter } from 'react-router-dom';
import { logout } from '../../auth/auth';
import { isAuthenticated } from '../../auth/auth-helper';

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: '#ff4081' };

  return { color: '#ffffff' };
};

const Menu = withRouter(({ history }) => {
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

        <Link to="/">
          <IconButton
            aria-label="Home"
            style={isActive(history, '/')}
          >
            <HomeIcon />
          </IconButton>
        </Link>

        <Link to="/users">
          <Button style={isActive(history, '/users')}>Users</Button>
        </Link>

        {
          !isAuthenticated() && (
            <span>
              <Link to="/signup">
                <Button style={isActive(history, '/signup')}>Sign up</Button>
              </Link>

              <Link to="/login">
                <Button style={isActive(history, '/login')}>Sign In</Button>
              </Link>
            </span>
          )
        }

        {
          isAuthenticated() && (
            <span>
              <Link to={`/user/${isAuthenticated().user._id}`}>
                <Button style={isActive(history, `/user/${isAuthenticated().user._id}`)}>My Profile</Button>
              </Link>

              <Button
                color="inherit"
                onClick={logoutClick}
              >
                Sign out
              </Button>
            </span>
          )
        }
      </Toolbar>
    </AppBar>
  );
});

export default Menu;

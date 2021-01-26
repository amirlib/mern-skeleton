import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit';
import Person from '@material-ui/icons/Person';
import Divider from '@material-ui/core/Divider';
import { Redirect, Link, useParams } from 'react-router-dom';
import DeleteUser from './DeleteUser';
import { isAuthenticated } from '../../auth/auth-helper';
import { read } from '../../user/api-user';

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
  }),
  title: {
    marginTop: theme.spacing(3),
    color: theme.palette.protectedTitle,
  },
}));

const Profile = () => {
  const jwt = isAuthenticated();
  const params = useParams();
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const fetchProfile = async (signalToAbort) => {
      const res = await read(
        params.userId,
        jwt.token,
        signalToAbort,
      );

      if (res && res.error) {
        setRedirectToLogin(true);
      } else {
        setUser(res);
      }
    };

    fetchProfile(signal);

    return function cleanup() {
      abortController.abort();
    };
  }, [params.userId]);

  if (redirectToLogin) {
    return <Redirect to="/login" />;
  }

  return (
    <Paper
      className={classes.root}
      elevation={4}
    >
      <Typography
        className={classes.title}
        variant="h6"
      >
        Profile
      </Typography>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Person />
            </Avatar>
          </ListItemAvatar>

          <ListItemText
            primary={user.name}
            secondary={user.email}
          />

          {
            isAuthenticated().user
            && isAuthenticated().user._id === user._id
            && (
              <ListItemSecondaryAction>
                <Link to={`/user/edit/${user._id}`}>
                  <IconButton
                    aria-label="Edit"
                    color="primary"
                  >
                    <Edit />
                  </IconButton>
                </Link>

                <DeleteUser userId={user._id} />
              </ListItemSecondaryAction>
            )
          }
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary={`Joined: ${new Date(user.createdAt).toDateString()}`} />
        </ListItem>
      </List>
    </Paper>
  );
};

Profile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string,
    }),
  }).isRequired,
};

export default Profile;

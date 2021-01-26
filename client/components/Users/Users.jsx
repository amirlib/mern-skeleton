import React, { useState, useEffect } from 'react';
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
import ArrowForward from '@material-ui/icons/ArrowForward';
import Person from '@material-ui/icons/Person';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../../auth/auth-helper';
import { list } from '../../user/api-user';

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(1),
    margin: theme.spacing(5),
  }),
  title: {
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
  },
}));

const Users = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const jwt = isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const fetchUsers = async (signalToAbort) => {
      const res = await list(
        jwt.token,
        signalToAbort,
      );

      if (res && !res.error) setUsers(res);
    };

    fetchUsers(signal);

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <Paper
      className={classes.root}
      elevation={4}
    >
      <Typography
        className={classes.title}
        variant="h6"
      >
        All Users
      </Typography>

      <List dense>
        {users.map((item) => (
          <Link
            key={item._id}
            to={`/user/${item._id}`}
          >
            <ListItem button>
              <ListItemAvatar>
                <Avatar>
                  <Person />
                </Avatar>
              </ListItemAvatar>

              <ListItemText primary={item.name} />

              <ListItemSecondaryAction>
                <IconButton>
                  <ArrowForward />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Link>
        ))}
      </List>
    </Paper>
  );
};

export default Users;

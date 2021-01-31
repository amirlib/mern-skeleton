import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { getJwt } from '../../auth/auth-helper';
import { list } from '../../user/api-user';
import UsersList from './UsersList';

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

  useEffect(() => {
    const jwt = getJwt();
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

      <UsersList users={users} />
    </Paper>
  );
};

export default Users;

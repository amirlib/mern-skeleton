import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { list } from '../../user/api-user';
import UsersList from './UsersList';
import TitleTypography from '../UI/typographies/TitleTypography';

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(1),
    margin: theme.spacing(5),
  }),
}));

const Users = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const fetchUsers = async (signalToAbort) => {
      const res = await list(signalToAbort);

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
      <TitleTypography title="All Users" />

      <UsersList users={users} />
    </Paper>
  );
};

export default Users;

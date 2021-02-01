import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Profile from './Profile';
import ProfileNotFound from './ProfileNotFound';
import { getJwt } from '../../auth/auth-helper';
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

const ProfilePage = () => {
  const params = useParams();
  const classes = useStyles();
  const [init, setInit] = useState(false);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const jwt = getJwt();
    const abortController = new AbortController();
    const { signal } = abortController;

    const fetchProfile = async (signalToAbort) => {
      const res = await read(
        params.userId,
        jwt.token,
        signalToAbort,
      );

      if (res && res.error) {
        setUser(undefined);
      } else {
        setUser(res);
      }

      setInit(true);
    };

    fetchProfile(signal);

    return function cleanup() {
      abortController.abort();
    };
  }, [params.userId]);

  return (
    <Paper
      className={classes.root}
      elevation={4}
    >
      {
        !user && init && <ProfileNotFound />
      }

      {
        user && init && <Profile user={user} />
      }
    </Paper>
  );
};

ProfilePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string,
    }),
  }).isRequired,
};

export default ProfilePage;

import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Profile from './Profile';
import ProfileNotFound from './ProfileNotFound';
import { AuthContext } from '../../contexts/auth.context';
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
  const { verify } = useContext(AuthContext);
  const [init, setInit] = useState(false);
  const [profile, setProfile] = useState(undefined);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const fetchProfile = async (signalToAbort) => {
      const res = await read(
        params.userId,
        signalToAbort,
      );

      if (res && res.error) {
        setProfile(undefined);
      } else {
        await verify();

        setProfile(res);
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
        !profile && init && <ProfileNotFound />
      }

      {
        profile && init && <Profile profile={profile} />
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

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
  const [profile, setProfile] = useState(undefined);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const fetchProfile = async (signalToAbort) => {
      const isVerified = await verify();

      if (!isVerified) return;

      const res = await read(
        params.userId,
        signalToAbort,
      );

      if (res && res.error) {
        setProfile({});
      } else {
        setProfile(res);
      }
    };

    fetchProfile(signal);

    return function cleanup() {
      abortController.abort();
    };
  }, [params.userId]);

  const renderProfile = () => {
    if (!profile) return null;

    if (Object.keys(profile).length > 0) return <Profile profile={profile} />;

    return <ProfileNotFound />;
  };

  return (
    <Paper
      className={classes.root}
      elevation={4}
    >
      {renderProfile()}
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

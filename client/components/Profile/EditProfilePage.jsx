import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useParams } from 'react-router-dom';
import { logoutAll } from '../../auth/auth';
import { isAuthenticated } from '../../auth/auth-helper';
import { read, update } from '../../user/api-user';
import EditProfileForm from './EditProfileForm';
import NoticeDialog from '../UI/dialogs/NoticeDialog';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  list: {
    maxWidth: 400,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
  },
}));

const EditProfilePage = () => {
  const history = useHistory();
  const params = useParams();
  const classes = useStyles();
  const jwt = isAuthenticated();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    email: '',
    error: '',
    name: '',
    password: '',
  });

  useEffect(() => {
    console.log('EditProfilePage => useEffect');
    const abortController = new AbortController();
    const { signal } = abortController;

    const fetchProfile = async (signalToAbort) => {
      const res = await read(
        params.userId,
        jwt.token,
        signalToAbort,
      );

      if (res && res.error) {
        setValues({
          ...values,
          error: res.error,
        });
      } else {
        setValues({
          ...values,
          email: res.email,
          error: '',
          name: res.name,
        });
      }
    };

    fetchProfile(signal);

    return function cleanup() {
      abortController.abort();
    };
  }, [params.userId]);

  const logoutAllClick = async () => {
    await logoutAll(jwt.token);

    return history.push('/');
  };

  const saveClick = async () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    };

    const res = await update(
      params.userId,
      jwt.token,
      user,
    );

    if (res && res.error) {
      setValues({
        ...values,
        error: res.error,
      });
    } else {
      setValues({
        ...values,
        error: '',
      });
      setOpen(true);
    }
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography
            className={classes.title}
            variant="h6"
          >
            Edit Profile
          </Typography>

          <EditProfileForm
            email={values.email}
            error={values.error}
            handleChange={handleChange}
            name={values.name}
            password={values.password}
          />

          <List
            className={classes.list}
            component="nav"
          >
            <Divider />

            <ListItem
              button
              onClick={logoutAllClick}
            >
              <ListItemIcon />
              <ListItemText primary="Logout from all devices" />
            </ListItem>

            <Divider />

            <ListItem
              button
              onClick={saveClick}
            >
              <ListItemIcon>
                <SaveIcon />
              </ListItemIcon>

              <ListItemText primary="Save Changes" />
            </ListItem>

            <Divider />
          </List>
        </CardContent>
      </Card>

      <NoticeDialog
        dialogText="The changes have been saved."
        dialogTitle="Edit profile"
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

EditProfilePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string,
    }),
  }).isRequired,
};

export default EditProfilePage;

import React, { useContext, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import RedirectDialog from '../UI/dialogs/RedirectDialog';
import { AuthContext } from '../../contexts/auth.context';
import { create } from '../../user/api-user';
import SignupForm from './SignupForm';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2),
  },
}));

const Signup = () => {
  const location = useLocation();
  const classes = useStyles();
  const { isUserLoggedIn } = useContext(AuthContext);
  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
    open: false,
    error: '',
  });
  const { from } = location.state || {
    from: {
      pathname: '/',
    },
  };

  if (isUserLoggedIn()) {
    return <Redirect to={from} />;
  }

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const signupClick = async () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    };

    const res = await create(user);

    if (res.error) {
      setValues({
        ...values,
        error: res.error,
      });
    } else {
      setValues({
        ...values,
        error: '',
        open: true,
      });
    }
  };

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography
            className={classes.title}
            variant="h6"
          >
            Sign Up
          </Typography>

          <SignupForm
            email={values.email}
            error={values.error}
            handleChange={handleChange}
            name={values.name}
            password={values.password}
          />
        </CardContent>

        <CardActions>
          <Button
            className={classes.submit}
            color="primary"
            onClick={signupClick}
            variant="contained"
          >
            Submit
          </Button>
        </CardActions>
      </Card>

      <RedirectDialog
        actionRedirect="/login"
        actionText="Sign In"
        dialogText="New account successfully created."
        dialogTitle="New Account"
        open={values.open}
      />
    </div>
  );
};

export default Signup;

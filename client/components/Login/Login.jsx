import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect, useLocation } from 'react-router-dom';
import { login } from '../../auth/auth';
import LoginForm from './LoginForm';

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

const Login = () => {
  const classes = useStyles();
  const location = useLocation();
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    redirectToReferrer: false,
  });

  const { from } = location.state || {
    from: {
      pathname: '/',
    },
  };

  const LoginClick = async () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };

    const res = await login(user);

    if (res && res.error) {
      setValues({
        ...values,
        error: res.error,
      });
    } else {
      setValues({
        ...values,
        error: '',
        redirectToReferrer: true,
      });
    }
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  if (values.redirectToReferrer) {
    return <Redirect to={from} />;
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          variant="h6"
        >
          Login
        </Typography>

        <LoginForm
          email={values.email}
          error={values.error}
          handleChange={handleChange}
          password={values.password}
        />
      </CardContent>

      <CardActions>
        <Button
          className={classes.submit}
          color="primary"
          onClick={LoginClick}
          variant="contained"
        >
          Submit
        </Button>
      </CardActions>
    </Card>
  );
};

export default Login;

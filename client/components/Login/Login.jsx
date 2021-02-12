import React, { useContext, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth.context';
import LoginForm from './LoginForm';
import TitleTypography from '../UI/typographies/TitleTypography';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2),
  },
}));

const Login = () => {
  const location = useLocation();
  const classes = useStyles();
  const { isUserLoggedIn, login } = useContext(AuthContext);
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    redirectToReferrer: isUserLoggedIn(),
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
        <TitleTypography title="Login" />

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

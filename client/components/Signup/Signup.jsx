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
import { userSanitizer, userValidator } from '../../validators/user.validator';
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
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    email: '',
    name: '',
    password: '',
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
    if (error) setError('');

    const sanitizedValues = userSanitizer(values);
    const validations = userValidator(sanitizedValues);

    if (validations.error) {
      setError(validations.error);

      return;
    }

    const res = await create(values);

    if (res.error) {
      setError(res.error);
    } else {
      setError('');
      setOpen(true);
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
            error={error}
            handleChange={handleChange}
            name={values.name}
            password={values.password}
          />
        </CardContent>
        <br />
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
        open={open}
      />
    </div>
  );
};

export default Signup;

import React from 'react';
import PropTypes from 'prop-types';
import EmailField from '../UI/fields/EmailField';
import PasswordField from '../UI/fields/PasswordField';
import ErrorTypography from '../UI/typographies/ErrorTypography';
import FormContext from '../../contexts/formContext';

const LoginForm = (props) => {
  const {
    email,
    error,
    handleChange,
    password,
  } = props;

  return (
    <>
      <FormContext.Provider value={{ handleChange }}>
        <EmailField value={email} />
        <br />

        <PasswordField
          showHelperText={false}
          value={password}
        />
      </FormContext.Provider>

      <ErrorTypography errorText={error} />
    </>
  );
};

LoginForm.propTypes = {
  email: PropTypes.string,
  error: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  password: PropTypes.string,
};

LoginForm.defaultProps = {
  email: '',
  error: '',
  password: '',
};

export default LoginForm;

import React from 'react';
import PropTypes from 'prop-types';
import CostumeTextField from '../UI/fields/CostumeTextField';
import EmailField from '../UI/fields/EmailField';
import PasswordField from '../UI/fields/PasswordField';
import ErrorTypography from '../UI/typographies/ErrorTypography';
import FormContext from '../../contexts/formContext';

const SignupForm = (props) => {
  const {
    email,
    error,
    handleChange,
    name,
    password,
  } = props;

  return (
    <>
      <FormContext.Provider value={{ handleChange }}>
        <CostumeTextField
          id="name"
          label="Name"
          type="text"
          value={name}
        />
        <br />

        <EmailField value={email} />
        <br />

        <PasswordField value={password} />
      </FormContext.Provider>

      <ErrorTypography errorText={error} />
    </>
  );
};

SignupForm.propTypes = {
  email: PropTypes.string,
  error: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  password: PropTypes.string,
};

SignupForm.defaultProps = {
  email: '',
  error: '',
  name: '',
  password: '',
};

export default SignupForm;

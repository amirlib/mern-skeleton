import React from 'react';
import PropTypes from 'prop-types';
import EmailField from '../UI/fields/EmailField';
import NameField from '../UI/fields/NameField';
import PasswordField from '../UI/fields/PasswordField';
import ErrorTypography from '../UI/typographies/ErrorTypography';
import FormContext from '../../contexts/formContext';

const SignupForm = (props) => {
  const { error, handleChange, values } = props;

  return (
    <>
      <FormContext.Provider value={{ handleChange }}>
        <NameField value={values.name} />
        <br />

        <EmailField value={values.email} />
        <br />

        <PasswordField value={values.password} />
      </FormContext.Provider>

      <ErrorTypography errorText={error} />
    </>
  );
};

SignupForm.propTypes = {
  error: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.shape({
    email: PropTypes.string,
    name: PropTypes.string,
    password: PropTypes.string,
  }),
};

SignupForm.defaultProps = {
  error: '',
  values: {
    email: '',
    name: '',
    password: '',
  },
};

export default SignupForm;

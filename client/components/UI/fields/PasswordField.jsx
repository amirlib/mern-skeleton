import React from 'react';
import PropTypes from 'prop-types';
import CostumeTextField from './CostumeTextField';

const PasswordField = (props) => {
  const { value } = props;

  return (
    <CostumeTextField
      id="password"
      label="Password"
      type="password"
      value={value}
    />
  );
};

PasswordField.propTypes = {
  value: PropTypes.string,
};

PasswordField.defaultProps = {
  value: '',
};

export default PasswordField;

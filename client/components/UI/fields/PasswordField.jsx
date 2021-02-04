import React from 'react';
import PropTypes from 'prop-types';
import CostumeTextField from './CostumeTextField';

const PasswordField = (props) => {
  const { showHelperText, value } = props;

  return (
    <CostumeTextField
      helperText={showHelperText ? 'Password must include at least 5 characters' : ''}
      id="password"
      label="Password"
      type="password"
      value={value}
    />
  );
};

PasswordField.propTypes = {
  showHelperText: PropTypes.bool,
  value: PropTypes.string,
};

PasswordField.defaultProps = {
  showHelperText: true,
  value: '',
};

export default PasswordField;

import React from 'react';
import PropTypes from 'prop-types';
import CostumeTextField from './CostumeTextField';

const EmailField = (props) => {
  const { value } = props;

  return (
    <CostumeTextField
      id="email"
      label="Email"
      type="email"
      value={value}
    />
  );
};

EmailField.propTypes = {
  value: PropTypes.string,
};

EmailField.defaultProps = {
  value: '',
};

export default EmailField;

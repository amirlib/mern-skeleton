import React from 'react';
import PropTypes from 'prop-types';
import CostumeTextField from './CostumeTextField';

const NameField = (props) => {
  const { value } = props;

  return (
    <CostumeTextField
      helperText="Name must include at least 2 characters"
      id="name"
      label="Name"
      value={value}
    />
  );
};

NameField.propTypes = {
  value: PropTypes.string,
};

NameField.defaultProps = {
  value: '',
};

export default NameField;

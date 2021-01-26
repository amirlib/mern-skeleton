import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import FormContext from '../../../contexts/formContext';

const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
}));

const CostumeTextField = (props) => {
  const classes = useStyles();
  const { handleChange } = useContext(FormContext);
  const {
    id,
    label,
    type,
    value,
  } = props;

  return (
    <TextField
      className={classes.textField}
      id={id}
      label={label}
      margin="normal"
      name={id}
      onChange={handleChange}
      type={type}
      value={value}
    />
  );
};

CostumeTextField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
};

CostumeTextField.defaultProps = {
  value: '',
};

export default CostumeTextField;

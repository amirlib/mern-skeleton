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
    helperText,
    id,
    label,
    multiline,
    rows,
    type,
    value,
  } = props;

  return (
    <TextField
      className={classes.textField}
      helperText={helperText}
      id={id}
      label={label}
      margin="normal"
      multiline={multiline}
      name={id}
      onChange={handleChange}
      rows={rows}
      type={type}
      value={value}
    />
  );
};

CostumeTextField.propTypes = {
  helperText: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  type: PropTypes.string,
  value: PropTypes.string,
};

CostumeTextField.defaultProps = {
  helperText: '',
  multiline: false,
  rows: 1,
  type: 'text',
  value: '',
};

export default CostumeTextField;

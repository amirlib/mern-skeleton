import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  error: {
    verticalAlign: 'middle',
  },
}));

const ErrorTypography = (props) => {
  const classes = useStyles();
  const { errorText } = props;

  return (
    <>
      {
        errorText && (
          <Typography
            color="error"
            component="p"
          >
            <Icon
              className={classes.error}
              color="error"
            >
              error
            </Icon>

            {errorText}
          </Typography>
        )
      }
    </>
  );
};

ErrorTypography.propTypes = {
  errorText: PropTypes.string,
};

ErrorTypography.defaultProps = {
  errorText: '',
};

export default ErrorTypography;

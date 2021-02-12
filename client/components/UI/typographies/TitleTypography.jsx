import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { TitleType } from '../../../style/types';

const useStyles = makeStyles((theme) => ({
  title: (type) => {
    let color;

    switch (type) {
      case TitleType.Open:
        color = theme.palette.openTitle;

        break;
      case TitleType.Protected:
        color = theme.palette.protectedTitle;

        break;
      default:
        color = theme.palette.openTitle;
    }

    return {
      color,
      marginTop: theme.spacing(3),
    };
  },
}));

const TitleTypography = (props) => {
  const { style, title, type } = props;
  const classes = useStyles(type);

  return (
    <Typography
      className={`${classes.title} ${style}`}
      variant="h6"
    >
      {title}
    </Typography>
  );
};

TitleTypography.propTypes = {
  style: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.symbol,
};

TitleTypography.defaultProps = {
  style: '',
  title: '',
  type: TitleType.Open,
};

export default TitleTypography;

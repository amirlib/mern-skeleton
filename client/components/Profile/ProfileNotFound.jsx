import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  text: {
    color: theme.palette.protectedTitle,
    marginTop: theme.spacing(3),
  },
}));

const ProfileNotFound = () => {
  const classes = useStyles();

  return (
    <Grid
      alignItems="center"
      className={classes.root}
      container
      justify="center"
      spacing={2}
    >
      <Grid item xs={4}>
        <Typography
          className={classes.text}
          variant="h1"
        >
          404
        </Typography>
      </Grid>

      <Grid item xs={8}>
        <Typography
          align="center"
          className={classes.text}
          variant="h6"
        >
          Profile Not Found
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ProfileNotFound;

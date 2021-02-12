import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import TitleTypography from '../UI/typographies/TitleTypography';
import unicornbikeImg from '../../assets/images/unicornbike.jpg';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5),
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
  },
  media: {
    minHeight: 400,
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <TitleTypography
        title="Home Page"
        style={classes.title}
      />

      <CardMedia
        className={classes.media}
        image={unicornbikeImg}
        title="Unicorn Bicycle"
      />

      <CardContent>
        <Typography
          variant="body2"
          component="p"
        >
          Welcome to the MERN Skeleton home page.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Home;

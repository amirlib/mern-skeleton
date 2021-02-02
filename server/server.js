import app from './express';

app.listen(process.env.PORT, (err) => {
  if (err) console.log(err);

  console.info('Server started on port %s.', process.env.PORT);
});

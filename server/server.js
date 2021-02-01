import mongoose from 'mongoose';
import app from './express';

mongoose.connect(
  process.env.MONGODB_URL,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${process.env.MONGODB_URL}`);
});

app.listen(process.env.PORT, (err) => {
  if (err) console.log(err);

  console.info('Server started on port %s.', process.env.PORT);
});

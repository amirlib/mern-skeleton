import mongoose from 'mongoose';
import app from './express';
import variables from '../environment/variables';

mongoose.connect(
  variables.mongoUri,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${variables.mongoUri}`);
});

app.listen(variables.port, (err) => {
  if (err) {
    console.log(err);
  }

  console.info('Server started on port %s.', variables.port);
});

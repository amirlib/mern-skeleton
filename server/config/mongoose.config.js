import mongoose from 'mongoose';

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

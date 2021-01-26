import cors from 'cors';
import compress from 'compression';
import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import path from 'path';
import expressJwt from 'express-jwt';
import compile from './devBundle';
import authRoutes from './routes/auth.routes';
import clientRoutes from './routes/client.routes';
import userRoutes from './routes/user.routes';
import config from '../config/config';

const CURRENT_WORKING_DIR = process.cwd();

const app = express();

// comment out before building for production
compile(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compress());
app.use(helmet());
app.use(cors());

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/', clientRoutes);

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: `${err.name}: ${err.message}` });
  } else if (err) {
    res.status(400).json({ error: `${err.name}: ${err.message}` });

    console.log(err);
  }
});

export default app;

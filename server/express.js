import compress from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import config from './config/config';
import { multerErrorHandling } from './config/multer.config';
import authRoutes from './routes/auth.routes';
import clientRoutes from './routes/client.routes';
import userRoutes from './routes/user.routes';

const CURRENT_WORKING_DIR = process.cwd();

const app = express();

config(app);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compress());
app.use(cors());

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/', clientRoutes);

app.use(multerErrorHandling);

export default app;

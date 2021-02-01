import helmetConfig from './helmet.config';
import compile from '../devBundle';

const config = (app) => {
  if (process.env.NODE_ENV === 'development') compile(app);

  helmetConfig(app);
};

export default config;

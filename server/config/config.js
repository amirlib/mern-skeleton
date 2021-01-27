import helmetConfig from './helmet.config';
import compile from '../devBundle';
import variables from '../../environment/variables';

const config = (app) => {
  if (variables.env === 'development') compile(app);

  helmetConfig(app);
};

export default config;

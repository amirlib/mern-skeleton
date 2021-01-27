import helmet from 'helmet';
import variables from '../../environment/variables';

const helmetConfig = (app) => {
  if (variables.env === 'development') {
    app.use(helmet({ contentSecurityPolicy: false }));
  } else {
    app.use(helmet());
  }
};

export default helmetConfig;

import helmet from 'helmet';

const helmetConfig = (app) => {
  if (process.env.NODE_ENV === 'development') {
    app.use(helmet({ contentSecurityPolicy: false }));
  } else {
    app.use(helmet());
  }
};

export default helmetConfig;

/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../config/config';
import webpackConfig from '../webpack.client.dev';

const compile = (app) => {
  if (config.env !== 'development') return;

  const compiler = webpack(webpackConfig);
  const middleware = webpackDevMiddleware(
    compiler,
    { publicPath: webpackConfig.output.publicPath },
  );

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
};

export default compile;

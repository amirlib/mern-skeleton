/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.client.common.js');

const CURRENT_WORKING_DIR = process.cwd();

const config = {
  mode: 'production',
  entry: [
    path.join(CURRENT_WORKING_DIR, 'client/main.jsx'),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

module.exports = merge(common, config);

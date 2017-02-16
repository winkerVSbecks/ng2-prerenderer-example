'use strict';

const path = require('path');
const loaders = require('../webpack/loaders');
const plugins = require('../webpack/plugins');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  target: 'node',

  entry: './prerenderer/index.ts',

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../prerender-dist'),
    libraryTarget: 'commonjs2',
  },

  devtool: isProduction ?
    'source-map' :
    'inline-source-map',

  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.js'],
  },

  plugins: plugins,

  devServer: {
    historyApiFallback: { index: '/' },
    proxy: {},
  },

  node: {
    global: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: true,
  },

  module: {
    rules: [
      loaders.ts_JiT,
      loaders.html,
      loaders.localCss,
      loaders.svg,
      loaders.eot,
      loaders.woff,
      loaders.woff2,
      loaders.ttf,
    ],
  },
};

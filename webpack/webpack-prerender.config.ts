'use strict';

// import * as path from 'path';
const loaders = require('./loaders.ts');
const plugins = require('./plugins.ts');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  // .entry:  {
  //   express: './src/server-express.ts'
  // },
  // target: 'node',

  entry: {
    app: './src/main.ts',
    vendor: './src/vendor.ts',
  },

  output: {
    filename: '[name]-bundle.js',
    path: './dist',
    // library: 'universal',
    // libraryTarget: 'commonjs2',
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
      loaders.angular,
      loaders.tslint,
      loaders.ts_JiT,
      loaders.html,
      loaders.globalCss,
      loaders.localCss,
      loaders.svg,
      loaders.eot,
      loaders.woff,
      loaders.woff2,
      loaders.ttf,
    ],
  },
};

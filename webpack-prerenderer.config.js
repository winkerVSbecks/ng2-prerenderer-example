'use strict';

const path = require('path');
const webpack = require('webpack');
const loaders = require('./webpack/loaders');
const postcss = require('./webpack/postcss');

const plugins = [
  new webpack.DefinePlugin({
    __DEV__: process.env.NODE_ENV !== 'production',
    __PRODUCTION__: process.env.NODE_ENV === 'production',
    __TEST__: JSON.stringify(process.env.TEST || false),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }),
  new webpack.LoaderOptionsPlugin({
    test: /\.css$/,
    options: {
      postcss,
    },
  }),
  new webpack.ContextReplacementPlugin(
    /angular\/core\/(esm\/src|src)\/linker/, __dirname),
];

module.exports = {
  target: 'node',

  entry: './prerenderer/index.ts',

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'prerender-dist'),
    libraryTarget: 'commonjs2',
  },

  devtool: 'source-map',

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

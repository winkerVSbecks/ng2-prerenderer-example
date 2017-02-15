'use strict';

// Polyfills
import 'core-js/es6/symbol';
import 'core-js/es6/object';
import 'core-js/es6/function';
import 'core-js/es6/parse-int';
import 'core-js/es6/parse-float';
import 'core-js/es6/number';
import 'core-js/es6/math';
import 'core-js/es6/string';
import 'core-js/es6/date';
import 'core-js/es6/array';
import 'core-js/es6/regexp';
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/es6/reflect';
import 'core-js/es7/reflect';

import 'zone.js/dist/zone-node';
import 'ts-helpers';

var path = require('path');
const loaders = require('./loaders.ts');
const plugins = require('./plugins.ts');
const isProduction = process.env.NODE_ENV === 'production';

console.log(path.resolve(__dirname, '../dist'));

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
    // path: './dist',
    path: path.resolve(__dirname, '../dist'),
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

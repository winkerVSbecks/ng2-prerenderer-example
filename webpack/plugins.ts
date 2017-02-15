'use strict';

var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// const { UniversalPrerender } = require('angular2-webpack-prerender');
// const { AppModule } = require('./src/app.node.module');

const postcss = require('./postcss');

const sourceMap = process.env.TEST
  ? [new webpack.SourceMapDevToolPlugin({ filename: null, test: /\.ts$/ })]
  : [];

const basePlugins = [
  new webpack.DefinePlugin({
    __DEV__: process.env.NODE_ENV !== 'production',
    __PRODUCTION__: process.env.NODE_ENV === 'production',
    __TEST__: JSON.stringify(process.env.TEST || false),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }),
  new HtmlWebpackPlugin({
    template: './src/index.html',
    inject: 'body',
    minify: false,
    chunksSortMode: (chunk1, chunk2) => {
      const order = ['vendor', 'app'];
      const item1 = order.indexOf(chunk1.names[0]);
      const item2 = order.indexOf(chunk2.names[0]);

      if (item1 > item2) {
        return 1;
      } else if (item1 < item2) {
        return -1;
      }

      return 0;
    },
  }),
  new ExtractTextPlugin('styles.[contenthash].css'),
  new webpack.NoEmitOnErrorsPlugin(),
  new CopyWebpackPlugin([
    { from: 'src/assets', to: 'assets' },
  ]),
  new webpack.LoaderOptionsPlugin({
    test: /\.css$/,
    options: {
      postcss,
    },
  }),
  new webpack.ContextReplacementPlugin(
    /angular\/core\/(esm\/src|src)\/linker/, __dirname),
].concat(sourceMap);

const devPlugins = [
  new StyleLintPlugin({
    configFile: './.stylelintrc',
    files: ['src/**/*.css'],
    failOnError: false,
  }),
];

const prodPlugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
  }),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    mangle: {
      keep_fnames: true,
    },
    compress: {
      warnings: false,
    },
  }),
  // new UniversalPrerender({
  //   ngModule: AppModule,
  //   documentPath: './public/index.html',
  //   document: `<!DOCTYPE html>
  //   <html>
  //    <head>
  //      <meta charset="utf-8">
  //      <meta http-equiv="X-UA-Compatible" content="IE=edge">
  //      <meta name="description" content="">
  //      <meta name="viewport" content="width=device-width, initial-scale=1">
  //      <title>Rangle.io - Angular2 Starter</title>
  //      <base href="/">
  //    </head>
  //    <body>
  //      <rio-app></rio-app>
  //    </body>
  //   </html>`,
  //   time: true,
  //   originUrl: 'http://localhost:8080',
  //   baseUrl: '/',
  //   requestUrl: '/',
  //   preboot: false,
  // }),
];

module.exports = basePlugins
  .concat(process.env.NODE_ENV === 'production' ? prodPlugins : [])
  .concat(process.env.NODE_ENV === 'development' ? devPlugins : []);

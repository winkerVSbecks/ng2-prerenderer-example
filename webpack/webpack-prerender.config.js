'use strict';
require("core-js/es6/symbol");
require("core-js/es6/object");
require("core-js/es6/function");
require("core-js/es6/parse-int");
require("core-js/es6/parse-float");
require("core-js/es6/number");
require("core-js/es6/math");
require("core-js/es6/string");
require("core-js/es6/date");
require("core-js/es6/array");
require("core-js/es6/regexp");
require("core-js/es6/map");
require("core-js/es6/set");
require("core-js/es6/reflect");
require("core-js/es7/reflect");
require("zone.js/dist/zone-node");
require("ts-helpers");
var loaders = require('./loaders.ts');
var plugins = require('./plugins.ts');
var isProduction = process.env.NODE_ENV === 'production';
module.exports = {
    entry: {
        app: './src/main.ts',
        vendor: './src/vendor.ts',
    },
    output: {
        filename: '[name]-bundle.js',
        path: './dist',
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

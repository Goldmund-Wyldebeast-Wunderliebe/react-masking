'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = Object.assign({}, require('./webpack.config.base'), {
    devtool: null,
    entry: {
        'react-masking': './react-masking.jsx'
    },
    output: {
        path: path.join(__dirname, '../', 'dist'),
        publicPath: '/dist/',
        filename: '[name].js',
        libraryTarget: 'umd'
    },
    externals: {
        "react": "react"
    },
    eslint: {
        emitWarning: true
    }
});

Array.prototype.push.apply(module.exports.module.loaders, [
    require('./loaders/js-build')
]);

Array.prototype.push.apply(module.exports.plugins, [
    require('./plugins/define-build')
]);

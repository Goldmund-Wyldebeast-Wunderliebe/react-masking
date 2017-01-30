'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = Object.assign({}, require('./webpack.config.build'), {
    output: {
        path: path.join(__dirname, '../', 'dist'),
        publicPath: '/dist/',
        filename: '[name].min.js',
        libraryTarget: 'umd'
    },
});

Array.prototype.push.apply(module.exports.plugins, [
    require('./plugins/uglify')
]);

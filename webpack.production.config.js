'use strict';
const path = require('path');
const webpack = require('webpack');
var loaders = require('./webpack.loaders');


module.exports = {
  entry: './src/react-masking.jsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'react-masking.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['web_modules', 'node_modules'],
    alias: {
      react: path.resolve(path.join(path.resolve(__dirname), 'node_modules', 'react')),
    }
  },
  module: {
    loaders
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: false,
        sequences: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: true,
        if_return: true,
        join_vars: true,
        drop_console: false,
      },
      mangle: {
        except: ['require', 'export', '$super'],
      },
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
  ]
};

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
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: true
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
  ],
  externals: {
    'react': 'react',
    'react-dom' : 'reactDOM'
  }
};

'use strict';
const path = require('path');
const webpack = require('webpack');


module.exports = {
  entry: './src/react-masking.jsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'react-masking.js',
    libraryTarget: 'umd'
  },
  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ],
    preLoaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components|public)/,
        loader: 'eslint-loader'
      }
    ]
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
      compress: {
        warnings: true
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
  ],
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': 'reactDOM'
  }
};

const path = require('path');
const webpack = require('webpack')
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const ROOT_DIRECTORY = process.cwd();

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(ROOT_DIRECTORY, 'build'),
    writeToDisk: true,
    open: true,
    hot: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(ROOT_DIRECTORY, 'build'),
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});

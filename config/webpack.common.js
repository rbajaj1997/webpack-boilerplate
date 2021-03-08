const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT_DIRECTORY = process.cwd();

module.exports = {
  entry: path.resolve(ROOT_DIRECTORY, 'src/index.js'),
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 3 * 1024
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'my-app',
      filename: 'index.html',
      template: path.resolve(ROOT_DIRECTORY, 'src/index.html'),
      inject: 'head'
    }),
  ]
};

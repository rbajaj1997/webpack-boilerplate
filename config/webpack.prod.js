const path = require('path');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.js');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const ROOT_DIRECTORY = process.cwd();

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(ROOT_DIRECTORY, 'build'),
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[name].bundle.css',
      chunkFilename: '[id].css'
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), "..."],
    runtimeChunk: {
      name: 'runtime',
    },
  },
});

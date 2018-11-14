const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const buildFolder = 'build';

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: 'scripts/main.js',
    path: path.resolve(__dirname, buildFolder)
  },
  stats: {
    assets: false
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, buildFolder),
    compress: true,
    port: 3003,
    open: true
  },
  plugins: [
    new CleanWebpackPlugin(buildFolder)
  ]
});

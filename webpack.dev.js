const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const buildPath = 'build-webpack';

module.exports = merge(common, {
  mode: "development",
  output: {
    path: path.resolve(__dirname, buildPath),
    filename: 'scripts/main.js'
  },
  stats: {
    assets: false
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, buildPath),
    compress: true,
    port: 3003,
    open: true
  },
  watch: true,
  plugins: [
    new CleanWebpackPlugin(buildPath),
    new CopyWebpackPlugin([
      { from: 'assets', to: 'assets' }
    ])
  ]
});

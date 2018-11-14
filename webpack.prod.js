const path = require("path");
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const buildFolder = 'release';

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "scripts/main.js",
    path: path.resolve(__dirname, buildFolder)
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(buildFolder),
    new Dotenv({
      systemvars: true
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, buildFolder),
    compress: true,
    port: 3003,
    open: true
  }
});

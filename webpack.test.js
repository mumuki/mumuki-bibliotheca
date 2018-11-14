const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  stats: "errors-only",
  devtool: 'inline-source-map',
  plugins: [
    new CopyWebpackPlugin([
      { from: 'assets', to: 'assets' }
    ])
  ]
});

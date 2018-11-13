const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: './scripts/app.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ["angularjs-annotate"]
          }
        }]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { sourceMap: true } },
          "sass-loader"
        ]
      },
      {
        test: /\.pug?$|\.jade$/,
        use:
          [
            "file-loader?name=[path][name].html",
            "extract-loader",
            "html-loader",
            "pug-html-loader"]
      },
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
        use:
          [{
            loader: "file-loader",
            options: {
              name: '[name].[ext]',
              outputPath: "./styles/fonts",
              publicPath: "./fonts"
            },
          }]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles/main.css"
    })
  ]
};

const del = require('del');
const gulp = require('gulp');
const runs = require('run-sequence');
const glps = require('gulp-load-plugins');
const webpack = require('webpack-stream');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const $ = glps();

const srcFolder = 'src';
const outFolder = 'build';
const configFolder = 'config';


module.exports = (done) => {
  process.env.NODE_ENV = 'development';
  runs('dev:build', 'dev:watch', 'dev:serve', done);
};


gulp.task('dev:build', (done) => {
  runs('dev:clean', 'dev:scripts', 'dev:styles', 'dev:views', 'dev:images', 'dev:assets', 'dev:flags', done);
});

gulp.task('dev:watch', () => {
  gulp.watch(`${srcFolder}/index.jade`, ['dev:views:index']);
  gulp.watch(`${srcFolder}/views/**/*`, ['dev:views:jade']);
  gulp.watch(`${srcFolder}/fonts/**/*`, ['dev:styles']);
  gulp.watch(`${srcFolder}/assets/**/*`, ['dev:assets']);
  gulp.watch(`${srcFolder}/images/**/*`, ['dev:images']);
  gulp.watch(`${srcFolder}/styles/**/*`, ['dev:styles']);
  gulp.watch(`${srcFolder}/scripts/**/*`, ['dev:scripts']);
});

gulp.task('dev:serve', () => {
  gulp
    .src(`${outFolder}`)
    .pipe($.webserver({
      open: true,
      port: 3003,
      host: 'localhost',
      livereload: 35730
    }));
});

gulp.task('dev:clean', (done) => {
  return del(`${outFolder}`, { force: true });
});

gulp.task('dev:scripts', ['dev:config'], function () {
  return gulp.src(`${srcFolder}/scripts/**/*.js`)
    .pipe(webpack({
      mode: process.env.NODE_ENV,
      output: { filename: "main.js" },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                plugins: ["angularjs-annotate"]
              }
            }
          }
        ]
      },
      devtool: 'source-map'
    }))
    .pipe(gulp.dest(`${outFolder}/scripts`));
});

gulp.task('dev:config', function () {
  return gulp.src(`${configFolder}/${process.env.NODE_ENV}.js`)
    .pipe($.concat('config.js'))
    .pipe(gulp.dest(`${srcFolder}/scripts/config`));
});

gulp.task('dev:styles', function () {
  return gulp.src(`${srcFolder}/styles/**/[^_]*.scss`)
    .pipe(webpack({
      mode: process.env.NODE_ENV,
      module: {
        rules: [{
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader", // translates CSS into CommonJS
            "sass-loader" // compiles Sass to CSS, using Node Sass by default
          ]
        }, {
          test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
          use: [{
            loader: "file-loader",
            options: {
              name: '[name].[ext]',
              outputPath: "../fonts/"
            }
          }]
        }]
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: "main.css"
        })
      ]
    }))
    .pipe(gulp.dest(`${outFolder}/styles`));
});

gulp.task('dev:views', (done) => {
  runs(['dev:views:index', 'dev:views:jade'], done);
});

gulp.task('dev:assets', function () {
  return gulp.src(`${srcFolder}/assets/**/*`)
    .pipe(gulp.dest(`${outFolder}/assets/`));
});

gulp.task('dev:views:index', () => {
  return gulp.src(`${srcFolder}/index.jade`)
    .pipe($.pug({ pretty: true }))
    .pipe($.usemin({
      js: [],
      css: [],
      es6: [],
      scss: []
    }))
    .pipe(gulp.dest(`${outFolder}`));
});

gulp.task('dev:views:jade', () => {
  return gulp.src(`${srcFolder}/views/**/*.jade`)
    .pipe($.pug({ pretty: true }))
    .pipe(gulp.dest(`${outFolder}/views`));
});

gulp.task('dev:images', function () {
  return gulp.src(`${srcFolder}/images/**/*`)
    .pipe(gulp.dest(`${outFolder}/images`));
});

gulp.task('dev:flags', function () {
  return gulp.src(`node_modules/flag-icon-css/flags/**/*`)
    .pipe(gulp.dest(`${outFolder}/flags`));
});

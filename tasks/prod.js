const del = require('del');
const gulp = require('gulp');
const runs = require('run-sequence');
const webpack = require('webpack-stream');
const glps = require('gulp-load-plugins');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const uglify = require("gulp-uglify-es").default;

const $ = glps();

const srcFolder = 'src';
const outFolder = 'build';
const configFolder = 'config';
const releaseFolder = 'release';

$.replaceEnvVar = (variable) => $.stringReplace(`<${variable}>`, process.env[variable]);
$.protocol = $.stringReplace(/https?:\/\//g, '//');


module.exports = (done) => {
  process.env.NODE_ENV = 'production';
  runs('prod:clean', 'prod:build', 'prod:views', 'prod:release', done);
};

gulp.task('prod:build', ['prod:clean'], (done) => {
  runs('prod:scripts', ['prod:styles', 'prod:images', 'prod:assets'], done);
});

gulp.task('prod:clean', (done) => {
  return del(`${outFolder}`, { force: true });
});

gulp.task('prod:scripts', ['prod:config'], function () {
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
      }
    }))
    .pipe(gulp.dest(`${outFolder}/scripts`));
});

gulp.task('prod:config', function () {
  process.env.NODE_ENV = 'production';
  return gulp.src(`${configFolder}/${process.env.NODE_ENV}.js`)
    .pipe($.replaceEnvVar('MUMUKI_BIBLIOTHECA_API_URL'))
    .pipe($.replaceEnvVar('MUMUKI_LABORATORY_URL'))
    .pipe($.replaceEnvVar('MUMUKI_COOKIES_DOMAIN'))
    .pipe($.concat('config.js'))
    .pipe(gulp.dest(`${srcFolder}/scripts/config`));
});

gulp.task('prod:styles', function () {
  return gulp.src(`${srcFolder}/styles/main.scss`)
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
              outputPath: "fonts/"
            }
          }]
        }]
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: "main.css"
        }),
        new OptimizeCssAssetsPlugin({
          cssProcessorPluginOptions: {
            preset: ['default', { discardComments: { removeAll: true } }],
          }
        })
      ]
    }))
    .pipe(gulp.dest(`${outFolder}/styles`));
});

gulp.task('prod:views', (done) => {
  runs(['prod:views:index', 'prod:views:jade'], done);
});

gulp.task('prod:assets', function () {
  return gulp.src(`${srcFolder}/assets/**/*`)
    .pipe(gulp.dest(`${outFolder}/assets/`));
});

gulp.task('prod:views:index', () => {
  return gulp.src(`${srcFolder}/index.jade`)
    .pipe($.pug())
    .pipe($.usemin({
      js: [$.rev],
      css: [$.minifyCss, $.protocol, $.rev],
      es6: [uglify(), $.rev],
      scss: [$.rev]
    }))
    .pipe(gulp.dest(`${outFolder}`));
});

gulp.task('prod:views:jade', () => {
  return gulp.src(`${srcFolder}/views/**/*.jade`)
    .pipe($.pug())
    .pipe(gulp.dest(`${outFolder}/views`));
});

gulp.task('prod:images', function () {
  return gulp.src(`${srcFolder}/images/**/*`)
    .pipe(gulp.dest(`${outFolder}/images`));
});

gulp.task('prod:release', ['prod:release:clean'], function () {
  return gulp.src(`${outFolder}/**/*`)
    .pipe(gulp.dest(`${releaseFolder}`));
});

gulp.task('prod:release:clean', function () {
  return del(`${releaseFolder}`, { force: true });
});

gulp.task('prod:serve', ["prod:release:build"], () => {
  gulp
    .src(`${releaseFolder}`)
    .pipe($.webserver({
      open: true,
      port: 8080,
      host: 'bibliotheca.localmumuki.io',
      livereload: true
    }));
});

gulp.task('prod:release:build', (done) => {
  runs('prod:build', 'prod:views', 'prod:release', done);
});

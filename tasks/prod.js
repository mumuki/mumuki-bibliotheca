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

gulp.task('prod:build', (done) => {
  runs(['prod:scripts', 'prod:styles', 'prod:fonts', 'prod:images', 'prod:assets', 'prod:flags'], done);
});

gulp.task('prod:clean', (done) => {
  return del(`${outFolder}`, { force: true });
});

gulp.task('prod:scripts', ['prod:config'], function () {
  return gulp.src(`${srcFolder}/scripts/**/*.js`)
    .pipe($.babel({ presets: ['latest'] }))
    .pipe($.ngAnnotate())
    .pipe(webpack({
      mode: process.env.NODE_ENV
    }))
    .pipe($.concat('main.js'))
    .pipe(gulp.dest(`${outFolder}/scripts`));
});

gulp.task('prod:config', function () {
  return gulp.src(`${configFolder}/${process.env.NODE_ENV}.js`)
    .pipe($.replaceEnvVar('MUMUKI_BIBLIOTHECA_API_URL'))
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
            loader: "file-loader"
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
    // .pipe($.sass.sync({outputStyle: 'compressed'}))
    .pipe(gulp.dest(`${outFolder}/styles`));
});

gulp.task('prod:views', (done) => {
  runs(['prod:views:index', 'prod:views:jade'], done);
});

gulp.task('prod:fonts', function () {
  const fonts = [
    `${srcFolder}/fonts/**/*`,
    `node_modules/@bower-components/mumuki-styles/dist/fonts/**/*`
  ];
  return gulp.src(fonts)
    .pipe(gulp.dest(`${outFolder}/fonts`));
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

gulp.task('prod:flags', function () {
  return gulp.src(`node_modules/flag-icon-css/flags/**/*`)
    .pipe(gulp.dest(`${outFolder}/flags`));
});

gulp.task('prod:release', ['prod:release:clean'], function () {
  return gulp.src(`${outFolder}/**/*`)
    .pipe(gulp.dest(`${releaseFolder}`));
});

gulp.task('prod:release:clean', function () {
  return del(`${releaseFolder}`, { force: true });
});

gulp.task('prod:serve', () => {
  gulp
    .src(`${releaseFolder}`)
    .pipe($.webserver({
      open: true,
      port: 8080,
      host: 'bibliotheca.localmumuki.io',
      livereload: true
    }));
});

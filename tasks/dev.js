const del = require('del');
const gulp = require('gulp');
const runs = require('run-sequence');
const glps = require('gulp-load-plugins');

const $ = glps();

const srcFolder = 'src';
const outFolder = 'build';
const configFolder = 'config';


module.exports = (done) => {
  process.env.NODE_ENV = 'development';
  runs('dev:build', 'dev:watch', 'dev:serve', done);
}


gulp.task('dev:build', (done) => {
  runs('dev:clean', 'dev:scripts', 'dev:styles', 'dev:views', 'dev:fonts', 'dev:images', done);
});

gulp.task('dev:watch', () => {
  gulp.watch(`${srcFolder}/index.jade`, ['dev:views:index']);
  gulp.watch(`${srcFolder}/views/**/*`, ['dev:views:jade']);
  gulp.watch(`${srcFolder}/fonts/**/*`, ['dev:fonts']);
  gulp.watch(`${srcFolder}/images/**/*`, ['dev:images']);
  gulp.watch(`${srcFolder}/styles/**/*`, ['dev:styles']);
  gulp.watch(`${srcFolder}/scripts/**/*`, ['dev:scripts']);
  gulp.watch(`${srcFolder}/bower_components/**/*`, ['dev:views:index']);
});

gulp.task('dev:serve', () => {
  gulp
    .src(`${outFolder}`)
    .pipe($.webserver({
      open: true,
      port: 8080,
      host: 'editor.localmumuki.io',
      livereload: true
    }));
});

gulp.task('dev:clean', (done) => {
  return del(`${outFolder}`, { force: true });
});

gulp.task('dev:scripts', ['dev:config'], function () {
  return gulp.src(`${srcFolder}/scripts/**/*.js`)
    .pipe($.sourcemaps.init())
      .pipe($.babel({ presets: ['latest'] }))
      .pipe($.ngAnnotate())
      .pipe($.concat('main.js'))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(`${outFolder}/scripts`));
});

gulp.task('dev:config', function () {
  return gulp.src(`${configFolder}/${process.env.NODE_ENV}.js`)
    .pipe($.concat('config.js'))
    .pipe(gulp.dest(`${srcFolder}/scripts/config`));
});

gulp.task('dev:styles', function () {
  return gulp.src(`${srcFolder}/styles/**/*.scss`)
    .pipe($.sass.sync())
    .pipe(gulp.dest(`${outFolder}/styles`));
});

gulp.task('dev:views', (done) => {
  runs(['dev:views:index', 'dev:views:jade'], done);
});

gulp.task('dev:fonts', function () {
  const fonts = [
    `${srcFolder}/fonts/**/*`,
    `${srcFolder}/bower_components/dev-awesome/dist/fonts/**/*`,
    `${srcFolder}/bower_components/font-awesome/fonts/**/*`
  ]
  return gulp.src(fonts)
    .pipe(gulp.dest(`${outFolder}/fonts`));
});

gulp.task('dev:views:index', () => {
  return gulp.src(`${srcFolder}/index.jade`)
    .pipe($.pug({ pretty: true }))
    .pipe($.wiredep())
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

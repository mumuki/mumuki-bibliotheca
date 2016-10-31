const del = require('del');
const gulp = require('gulp');
const runs = require('run-sequence');
const glps = require('gulp-load-plugins');

const $ = glps();

const srcFolder = 'src';
const outFolder = 'build';


module.exports = (done) => {
  process.env.NODE_ENV = 'development';
  runs('dev:build', 'dev:watch', 'dev:serve', done);
}


gulp.task('dev:build', (done) => {
  runs('dev:clean', 'dev:scripts', 'dev:styles', 'dev:views', 'dev:fonts', done);
});

gulp.task('dev:watch', () => {
  gulp.watch(`${srcFolder}/index.jade`, ['dev:views:index']);
  gulp.watch(`${srcFolder}/views/**/*`, ['dev:views:jade']);
  gulp.watch(`${srcFolder}/fonts/**/*`, ['dev:fonts']);
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
      host: 'localmumuki.io',
      livereload: true
    }));
});

gulp.task('dev:clean', (done) => {
  return del(`${outFolder}`, { force: true });
});

gulp.task('dev:scripts', function () {
  return gulp.src(`${srcFolder}/scripts/**/*.js`)
    .pipe($.sourcemaps.init())
      .pipe($.babel({ presets: ['latest'] }))
      .pipe($.ngAnnotate())
      .pipe($.concat('main.js'))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(`${outFolder}/scripts`));
});

gulp.task('dev:styles', function () {
  return gulp.src(`${srcFolder}/styles/**/*.scss`)
    .pipe($.sass.sync())
    .pipe(gulp.dest(`${outFolder}/styles`));
});

gulp.task('dev:views', (done) => {
  runs(['dev:views:index'], done);
});

gulp.task('dev:fonts', function () {
  return gulp.src(`${srcFolder}/fonts/**/*`)
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

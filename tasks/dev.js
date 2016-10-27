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
  runs('dev:clean', 'dev:views', done);
});

gulp.task('dev:watch', () => {
  gulp.watch(`${srcFolder}/views/*`, ['dev:views']);
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

gulp.task('dev:views', (done) => {
  runs(['dev:views:index'], done);
});

gulp.task('dev:views:index', () => {
  return gulp.src(`${srcFolder}/index.jade`)
    .pipe($.pug({ pretty: true }))
    .pipe(gulp.dest(`${outFolder}`));
});

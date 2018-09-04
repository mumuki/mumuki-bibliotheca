const gulp = require('gulp');
const runs = require('run-sequence');

const srcFolder = 'src';
const specFolder = 'specs';


module.exports = (done) => {
  process.env.NODE_ENV = 'test';
  runs('test:karma', done);
};


gulp.task('test:karma', (done) => {
  const wiredep = require('wiredep');
  const bower = require('../bower.json').main;
  const Server = require('karma').Server;

  new Server({
    configFile: `${__dirname}/../karma.conf.js`,
    action: 'run',
    files: wiredep({ devDependencies: true }).js
      .concat(bower.filter((dep) => /\.js$/.test(dep)))
      .concat([
        `${srcFolder}/scripts/**/*.js`,
        `config/test.js`,
        `${specFolder}/context.js`,
        `${specFolder}/**/*.spec.js`
      ])
  }, done).start();
});

gulp.task('karma', (done) => {
  const wiredep = require('wiredep');
  const bower = require('../bower.json').main;
  const Server = require('karma').Server;

  new Server({
    configFile: `${__dirname}/../karma.conf.js`,
    action: 'run',
    singleRun: false,
    files: wiredep({ devDependencies: true }).js
      .concat(bower.filter((dep) => /\.js$/.test(dep)))
      .concat([
        `${srcFolder}/scripts/**/*.js`,
        `config/test.js`,
        `${specFolder}/context.js`,
        `${specFolder}/**/*.spec.js`
      ])
  }, done).start();
});


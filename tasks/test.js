const gulp = require('gulp');
const runs = require('run-sequence');

const srcFolder = 'src';
const specFolder = 'specs';

module.exports = (done) => {
  process.env.NODE_ENV = 'test';
  runs('test:karma', done);
};

gulp.task('test:karma', (done) => {
  const Server = require('karma').Server;

  new Server({
    configFile: `${__dirname}/../karma.conf.js`,
    action: 'run',
    files: [
      { pattern: `${srcFolder}/scripts/**/*.js`, watched: false },
      "node_modules/angular-mocks/angular-mocks.js",
      "config/test.js",
      { pattern: `${specFolder}/context.js`, watched: false },
      { pattern: `${specFolder}/**/*.spec.js`, watched: false }
    ]
  }, done).start();
});

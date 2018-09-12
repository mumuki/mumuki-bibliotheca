let spec;
let specAsync;
let afterSpec;
let beforeSpec;

function editorTest(message, callback) {
  let mocks = {};

  afterEach(() => {
    _.forIn(mocks, (mock) => {
      mock.verify();
      mock.restore();
    })
  });

  describe(message, function () {

    beforeEach(module('editor', function ($translateProvider){
      $translateProvider.preferredLanguage("en");
    }));

    spec = (test) => {
      it(`expectation`, inject(test));
    };

    specAsync = (test) => {
      it(`expectation`, (done) => inject(test(done)));
    };

    afterSpec = (tearDown) => {
      afterEach(inject(tearDown));
    };

    beforeSpec = (setUp) => {
      beforeEach(inject(setUp));
    };

    callback.bind(this)(mocks);
  });
}

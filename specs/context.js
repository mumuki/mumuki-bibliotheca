let spec;

function editorTest(message, callback) {

  let mocks = {};

  afterEach(() => {
    _.forIn(mocks, (mock) => {
      mock.verify();
      mock.restore();
    })
  });

  describe(message, function () {

    beforeEach(module('editor'));

    spec = (test) => {
      it(`expectation`, inject(test));
    }

    callback.bind(this)(mocks);

  });


}

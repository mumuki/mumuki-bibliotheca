let spec;
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

    beforeEach(module('editor'));

    spec = (test) => {
      it(`expectation`, inject(test));
    }

    afterSpec = (tearDown) => {
      afterEach(inject(tearDown));
    }

    beforeSpec = (setUp) => {
      beforeEach(inject(setUp));
    }

    callback.bind(this)(mocks);

  });


}

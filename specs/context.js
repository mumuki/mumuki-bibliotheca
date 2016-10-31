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

    let specCount = 0;

    spec = (test) => {
      const [n2, n1] = `0${++specCount}`.split('').reverse();
      it(`expectation ${n1}${n2}`, test);
    }

    callback.bind(this)(mocks);

  });


}

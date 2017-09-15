angular
  .module('editor')
  .service('Expectations', function (Api) {

    this._expectations = {};

    const fetchExpectations = () => {}

    const getExpectations = () => {
      return Api
        .getExpectations()
        .tap((expectations) => this._expectations = expectations);
    }

    const hasExpectations = () => {
      return _.isEmpty(this._expectations);
    }

    this.get = () => {
      return hasExpectations() ? getExpectations() : Promise.resolve(this._expectations);
    };

  });

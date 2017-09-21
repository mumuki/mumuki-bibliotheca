angular
  .module('editor')
  .service('Inspections', function (Api) {

    this._inspections = [];

    const getInspections = () => {
      return Api
        .getInspections()
        .tap((inspections) => this._inspections = inspections);
    }

    const hasInspections = () => {
      return _.isEmpty(this._inspections);
    }

    this.get = () => {
      return hasInspections() ? getInspections() : Promise.resolve(this._inspections);
    };

  });

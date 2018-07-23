angular
  .module('editor')
  .service('Inspections', function (Api,
                                    Inspection) {

    this._supportedInspections = [];

    const getSupportedInspections = () => {
      return Api
        .getSupportedInspections()
        .tap((inspections) => this._supportedInspections = inspections);
    }

    const hasInspections = () => {
      return _.isEmpty(this._supportedInspections);
    }

    this.get = () => {
      return hasInspections() ? getSupportedInspections() : Promise.resolve(this._supportedInspections);
    };

    this.fromArray = (expectations) => expectations.map(Inspection.fromServer);

    this.supportedSmells = () => {
      return _.chain(this)
              .get('_supportedInspections.smells', [])
              .map((i) => Inspection.fromSupportedSmell(i))
              .value();
    }

  });

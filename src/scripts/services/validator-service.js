angular
  .module('editor')
  .service('Validator', function ($filter) {

    const translate = $filter('translate');

    this.notEmptyString = (object, field) => {
      if (_.chain(object).get(field).trim().isEmpty().value()) {
        throw new Error(translate('error_mandatory_field', {
          field: translate(field),
          fullName: object.fullName(),
        }));
      }
    }

  });

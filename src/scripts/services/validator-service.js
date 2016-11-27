angular
  .module('editor')
  .service('Validator', function ($filter) {

    const translate = $filter('translate');

    const isEmptyString = (object, field) => {
      return _.chain(object).get(field).trim().isEmpty().value()
    }

    const isEmptyExpectation = (exercise, expectation) => {
      const fields = exercise.new_expectations ?
        ['subject', 'verb', 'object'] :
        ['binding', 'inspection'];
      return _.some(fields, (field) => isEmptyString(expectation, field));
    }

    const isIncompleteExpectation = (expectationable) => {
      return (expectation) => isEmptyExpectation(expectationable, expectation);
    }

    this.notEmptyString = (object, field) => {
      if (isEmptyString(object, field)) {
        throw new Error(translate('error_mandatory_field', {
          field: translate(field),
          fullName: object.fullName(),
        }));
      }
    }

    this.notIncompleteExpectations = (expectationable) => {
      if (_.some(expectationable.expectations, isIncompleteExpectation(expectationable))) {
        throw new Error(translate('error_expectations_incomplete_validation', {
          fullName: expectationable.fullName(),
        }))
      }
    }

  });

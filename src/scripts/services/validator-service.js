angular
  .module('editor')
  .service('Validator', function ($filter) {

    const translate = $filter('translate');

    const isEmptyString = (object, field) => {
      return _.chain(object).get(field).trim().isEmpty().value()
    }

    const isEmptyExpectation = (exercise, expectation) => {
      return isEmptyString(expectation, 'binding') ||
             isEmptyString(expectation, 'inspection') ||
             _.startsWith(expectation.inspection, 'undefined') ||
             _.endsWith(expectation.inspection, ':');
    }

    const isIncompleteExpectation = (expectationable) => {
      return (expectation) => isEmptyExpectation(expectationable, expectation);
    }

    const isIncompleteChoice = (choiceable) => {
      return (choice) => isEmptyString(choice, 'value');
    }

    this.notEmptyString = (object, field) => {
      if (isEmptyString(object, field)) {
        throw new Error(translate('error_mandatory_field', {
          field: translate(field),
          fullName: object.fullName(),
        }));
      }
    }

    this.notEmptyChoices = (choiceable) => {
      if (_.get(choiceable, 'choices', []).length < 2) {
        throw new Error(translate('error_choices_empty_validation', {
          fullName: choiceable.fullName(),
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

    this.notIncompleteChoices = (choiceable) => {
      if (_.some(choiceable.choices, isIncompleteChoice(choiceable))) {
        throw new Error(translate('error_choices_incomplete_validation', {
          fullName: choiceable.fullName(),
        }))
      }
    }

  });

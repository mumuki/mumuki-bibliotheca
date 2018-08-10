angular
  .module('editor')
  .service('Validator', function ($filter) {

    const translate = $filter('translate');

    this.isEmptyString = (string) => {
      return _.chain(string).trim().isEmpty().value();
    }

    this.isEmptyField = (object, field) => {
      return this.isEmptyString(_.get(object, field));
    }

    const isEmptyExpectation = (exercise, expectation) => {
      return this.isEmptyField(expectation, 'binding') ||
             this.isEmptyField(expectation, 'inspection') ||
             _.startsWith(expectation.inspection, 'undefined') ||
             _.endsWith(expectation.inspection, ':');
    }

    const isIncompleteExpectation = (expectationable) => {
      return (expectation) => isEmptyExpectation(expectationable, expectation);
    }

    const isIncompleteChoice = (choiceable) => {
      return (choice) => this.isEmptyField(choice, 'value');
    }

    const whenIsEmptyString = (rule) => {
      return _.isString(rule.when) && this.isEmptyField(rule, 'when');
    }

    const whenIsObjectWithEmptyString = (rule) => {
      const value = _.chain(rule.when).values().first().value();
      return _.isObject(rule.when) && _.isString(value) && _.chain(value).trim().isEmpty().value();
    }

    const whenIsArrayWithEmptyStrings = (rule) => {
      const values =_.chain(rule.when).values().first().value();
      return _.isObject(rule.when) && _.isArray(values) && (values.length === 0 || _.chain(values).some((it) => _.isEmpty(it.trim())).value());
    }

    const isIncompleteAssistanceRule = (rule) => {
      return this.isEmptyField(rule, 'then') || whenIsEmptyString(rule) || whenIsObjectWithEmptyString(rule) || whenIsArrayWithEmptyStrings(rule);
    }

    const isInvalidRandomizationValue = (value) => {
      switch(value.type){
        case "oneOf":
          return _.some(value.value, this.isEmptyString);
        case "range":
          return _.some(value.value, _.isNumber(value));
      }
    }

    const isIncompleteRandomizationValue = (value) => {
      return this.isEmptyField(value, 'type') || value.value.length < 2 || _.some(value.value, isInvalidRandomizationValue);
    }

    const isIncompleteRandomization = (randomization) => {
      return this.isEmptyString(randomization[0]) || isIncompleteRandomizationValue(randomization[1]);
    }

    this.notEmptyString = (object, field) => {
      if (this.isEmptyField(object, field)) {
        throw new Error(translate('error_mandatory_field', {
          field: translate(field),
          fullName: object.fullName(),
        }));
      }
    }

    this.notForbiddenFields = (object, fields) => {
      fields.forEach(field => this.notForbiddenField(object, field));
    }

    this.notForbiddenField = (object, field) => {
      if(object && object.hasOwnProperty(field)){
        throw new Error(translate('error_forbidden_field', {
          field: field,
          fullName: object.fullName()
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

    this.languageSupport = (exercise, type) => {
      const language = exercise.fullLanguage();
      if (!language[type]) {
        throw new Error(translate(`error_${type}_language_validation`, {
          exercise: exercise.fullName(),
          language: language.name
        }))
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

    this.validateAssistanceRules = (exercise) => {
      if (exercise.needsAssistanceRules() && _.some(exercise.assistance_rules, isIncompleteAssistanceRule)) {
        throw new Error(translate('error_assistance_rule_validation', {
          fullName: exercise.fullName(),
        }))
      }
    }

    this.validateRandomizations = (exercise) => {
      if (exercise.needsRandomizations() && _.some(_.toPairs(exercise.randomizations), isIncompleteRandomization)) {
        throw new Error(translate('error_randomization_validation', {
          fullName: exercise.fullName(),
        }))
      }
    }

  });

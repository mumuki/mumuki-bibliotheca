angular
  .module('editor')
  .factory('Inspection', function () {

    class Inspection {

      constructor (inspection) {
        _.defaultsDeep(this, inspection);
      }

      asBindingInspection() {
        return {
          binding: this.scope,
          inspection: this.asInspection(),
        }
      }

      asString() {
        return `${this.scope} ${this.asInspection()}`;
      }

      static isSmell(inspection) {
        return _(inspection.verb).startsWith('Except:');
      }

      static from(inspection = {}) {
        return Inspection.isSmell(inspection) ? Inspection.smell(inspection) : Inspection.expectation(inspection);
      }

      static smell(inspection = {}) {
        return Smell.from(inspection);
      }

      static expectation(inspection = {}) {
        return Expectation.from(inspection);
      }

      static fromSupportedSmell(string) {
        return Inspection.smell({ verb: string });
      }

      static fromSupportedExpectation(string) {
        return Inspection.expectation({ verb: string });
      }

      static fromServer({binding, inspection}) {
        const [verb, target] = _(inspection).split(/^(Not:.*:|Except:.*|.*:)/).compact().value();
        return Inspection.from({ verb: verb, scope: binding, target: target });
      }

    }

    class Smell extends Inspection {

      constructor (inspection) { super(inspection) }

      get isSmell() {
        return true;
      }

      needsArgument() {
        return false;
      }

      asInspection() {
        return `Except:${this.verb}`
      }

      static from(inspection = {}) {
        _.defaultsDeep(inspection, {
          verb: '',
          scope: '*',
          target: '',
        });
        inspection.verb = inspection.verb.replace(/^Except:/, '');
        return new Smell(inspection);
      }
    }

    class Expectation extends Inspection {

      constructor (inspection) { super(inspection) }

      get isSmell() {
        return false;
      }

      needsArgument() {
        return _.endsWith(this.verb, ':');
      }

      asInspection() {
        return `${this.verb}${this.needsArgument() ? this.target : ''}`;
      }

      static from(inspection = {}) {
        _.defaultsDeep(inspection, {
          verb: '',
          scope: '',
          target: '',
        });
        return new Expectation(inspection);
      }

    }

    return Inspection;

  });

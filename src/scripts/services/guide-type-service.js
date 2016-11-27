angular
  .module('editor')
  .service('GuideType', function() {

    const guideType = {
      problem: {
        name: () => 'problem',
      },
      playground: {
        name: () => 'playground',
      },
    }

    this.default = () => {
      return guideType.problem.name();
    }

    this.types = () => {
      return _.keys(guideType);
    }

    this.from = (type) => {
      return guideType[type] || this.default();
    }

  });

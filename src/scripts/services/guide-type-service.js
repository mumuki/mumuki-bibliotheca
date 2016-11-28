angular
  .module('editor')
  .service('GuideType', function() {

    const guideType = {
      learning: {
        name: () => 'learning',
      },
      practice: {
        name: () => 'practice',
      },
    }

    this.default = () => {
      return guideType.learning.name();
    }

    this.types = () => {
      return _.keys(guideType);
    }

    this.from = (type) => {
      return guideType[type] || this.default();
    }

  });

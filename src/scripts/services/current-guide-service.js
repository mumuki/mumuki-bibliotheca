angular
  .module('editor')
  .service('CurrentGuide', function () {

    let _guide;
    let _guideWithoutChanges;

    this.set = (guide) => {
      _guide = guide;
      _guideWithoutChanges = _.cloneDeep(guide);
    }

    this.get = () => {
      return _guide;
    }

    this.hasChanges = (guide) => {
      const newGuide = JSON.parse(angular.toJson(_.omitBy(_guide, _.isEmpty)));
      const oldGuide = JSON.parse(angular.toJson(_.omitBy(_guideWithoutChanges, _.isEmpty)));
      return !_.isEqual(newGuide, oldGuide);
    }

  });

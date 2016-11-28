angular
  .module('editor')
  .service('GuideTypes', function() {

    let _guideTypes = [
      { name: 'learning', icon: () => 'fa-graduation-cap' },
      { name: 'practice', icon: () => 'fa-laptop' },
    ]

    this.get = () => {
      return _guideTypes;
    }

    this.default = () => {
      return _guideTypes[0].name;
    }

    this.fromName = (name) => {
      return _.find(this.get(), { name });
    }

  });

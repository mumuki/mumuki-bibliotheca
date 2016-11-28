angular
  .module('editor')
  .service('CurrentGuide', function (Auth) {

    let _guide;
    let _organization;
    let _guideWithoutChanges;

    this.set = (guide) => {
      _guide = guide;
      this.setStored(guide);
    }

    this.get = () => {
      return _guide;
    }

    this.setStored = (savedGuide) => {
      _guideWithoutChanges = _.cloneDeep(savedGuide);
    }

    this.getOrganization = () => {
      return _organization || Auth.organizations()[0];
    }

    this.setOrganization = (organization) => {
      _organization = organization;
    }

    this.hasChanges = (guide) => {
      const newGuide = JSON.parse(angular.toJson(_.omitBy(_guide, _.isEmpty)));
      const oldGuide = JSON.parse(angular.toJson(_.omitBy(_guideWithoutChanges, _.isEmpty)));
      return !_.isEqual(newGuide, oldGuide);
    }

  });

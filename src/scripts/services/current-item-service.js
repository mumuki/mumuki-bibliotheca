angular
  .module('editor')
  .service('CurrentItem', function (Auth) {

    let _item;
    let _organization;
    let _itemWithoutChanges;

    this.set = (item) => {
      _item = item;
      this.setStored(item);
    }

    this.get = () => {
      return _item;
    }

    this.setStored = (savedItem) => {
      _itemWithoutChanges = _.cloneDeep(savedItem);
    }

    this.getOrganization = () => {
      return _organization;
    }

    this.setOrganization = (organization) => {
      _organization = organization;
    }

    this.hasChanges = (item) => {
      const newItem = JSON.parse(angular.toJson(_.omitBy(item, _.isEmpty)));
      const oldItem = JSON.parse(angular.toJson(_.omitBy(_itemWithoutChanges, _.isEmpty)));
      return !_.isEqual(newItem, oldItem);
    }

  });

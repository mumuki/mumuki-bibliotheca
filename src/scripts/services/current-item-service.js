angular
  .module('editor')
  .service('CurrentItem', function (Auth) {

    let _item;
    let _organization;
    let _itemWithoutChanges;

    this.set = (item) => {
      _item = item;
      this.setStored(item);
    };

    this.get = () => {
      return _item;
    };

    this.setStored = (savedItem) => {
      _itemWithoutChanges = _.cloneDeep(savedItem);
    };

    this.getOrganization = () => {
      return _organization;
    };

    this.setOrganization = (organization) => {
      _organization = organization;
    };

    this.hasChanges = (item) => {
      const newItem = omitByDeep(item, _.isEmpty);
      const oldItem = omitByDeep(_itemWithoutChanges, _.isEmpty);
      return !_.isEqual(newItem, oldItem);
    };

    const omitByDeep = (item, criteria) => {
      const newItem = JSON.parse(angular.toJson(_.omitBy(item, criteria)));
      omitNewItemValues(newItem, criteria);
      omitBooleanItemValues(item, newItem);
      return newItem;
    };

    const omitNewItemValues = (newItem, criteria) => {
      _.forOwn(newItem, (value, key) => {
        if (_.isObject(value)) {
          newItem[key] = JSON.parse(angular.toJson(omitByDeep(value, criteria)));
        } else if (_.isArray(value)) {
          newItem[key] = JSON.parse(angular.toJson(value.map((v) => omitByDeep(v, criteria))));
        }
      });
    };

    const omitBooleanItemValues = (item, newItem) => {
      _.forOwn(item, (value, key) => {
        if (_.isBoolean(value)) {
          newItem[key] = (!!item[key]).toString();
        }
      });
    };

  });

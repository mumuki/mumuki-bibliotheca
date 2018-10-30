angular
  .module('editor')
  .service('CurrentItem', function (Auth, Debounce, Languages) {

    let _item;
    let _organization;
    let _itemWithoutChanges;

    const _hasChanges = (item) => {
      const newItem = omitByDeep(item, _.isEmpty);
      const oldItem = omitByDeep(_itemWithoutChanges, _.isEmpty);
      return !_.isEqual(newItem, oldItem);
    }

    this.set = (item) => {
      if(item.language){
        Languages.fromName(item.language).setAssets();
      }
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
      return _organization || "";
    };

    this.setOrganization = (organization) => {
      _organization = organization;
    };

    this.hasChanges = _.throttle(_hasChanges, 100, {
      leading: true,
      trailing: false
    });

    const plainCloneDeep = (object) => JSON.parse(angular.toJson(object));

    const omitByDeep = (item, criteria) => {
      const newItem = plainCloneDeep(_.omitBy(item, criteria));
      omitNewItemValues(newItem, criteria);
      omitNonEmptyItemValues(item, newItem, _.isBoolean);
      omitNonEmptyItemValues(item, newItem, _.isNumber);
      return newItem;
    };

    const omitNewItemValues = (newItem, criteria) => {
      _.forOwn(newItem, (value, key) => {
        if (_.isObject(value)) {
          newItem[key] = plainCloneDeep(omitByDeep(value, criteria));
        } else if (_.isArray(value)) {
          newItem[key] = plainCloneDeep(value.map((v) => omitByDeep(v, criteria)));
        }
      });
    };

    const omitNonEmptyItemValues = (item, newItem, condition) => {
      _.forOwn(item, (value, key) => {
        if (condition(value)) {
          newItem[key] = value.toString();
        }
      });
    };

  });

angular
  .module('editor')
  .directive('multipleFiles', function (Languages,
                                        $filter) {

    return {

      restrict: 'E',
      templateUrl: 'views/directives/multiple-files.html',
      scope: {
        data: '=',
        getExtension: '&'
      },
      controller: ($scope) => {
        let activeTab;

        const translate = $filter('translate');
        const selectFirstTab = () => activeTab = _.chain($scope.data).keys().first().value();
        const extension = (key) => _.chain(key).split('.').last().value();
        const getKey = () => `file_${_.keys($scope.data).length + 1}.${$scope.getExtension()}`;
        const removeKey = (key) => delete $scope.data[key];

        $scope.select = (key) => {
          activeTab = key
        }

        $scope.isActive = (key) => {
          return activeTab === key;
        }

        $scope.addFile = (key = getKey(), content = '') => {
          $scope.data[key] = content;
          $scope.select(key);
        }

        $scope.removeFile = (key) => {
          removeKey(key);
          selectFirstTab();
        }

        $scope.changeFileName = (key) => {
          var newName = prompt(translate('multiple_files_new_name'), key);
          if (!_.isEmpty(newName) && newName !== key) {
            $scope.addFile(newName, $scope.data[key]);
            removeKey(key);
          }
        }

        $scope.getAceModeFromExtension = (key) => {
          return Languages.getAceModeFromExtension(extension(key));
        }

        $scope.getCommentFromExtension = (key) => {
          return Languages.getCommentFromExtension(extension(key));
        }

        if (_.isEmpty($scope.data)) {
          $scope.addFile();
        }

        selectFirstTab();

      }

    }

  })

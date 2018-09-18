angular
  .module('editor')
  .directive('multipleFiles', function (Languages,
                                        $filter) {

    return {

      restrict: 'E',
      templateUrl: 'views/directives/multiple-files.html',
      scope: {
        exercise: '='
      },
      controller: ($scope) => {

        let activeTab;

        const translate = $filter('translate');
        const isInvalidMultiFile = () => [_.isString, _.isEmpty].some((f) => f($scope.exercise.default_content));
        const selectFirstTab = () => activeTab = _.chain($scope.exercise.default_content).keys().first().value();
        const extension = (key) => _.chain(key).split('.').last().value();
        const getKey = () => `file_${_.keys($scope.exercise.default_content).length + 1}.${$scope.exercise.fullLanguage().extension}`;

        $scope.select = (key) => {
          activeTab = key
        }

        $scope.isActive = (key) => {
          return activeTab === key;
        }

        $scope.addFile = (key = getKey(), content = '') => {
          $scope.exercise.default_content[key] = content;
          $scope.select(key);
        }

        $scope.removeFile = (key) => {
          delete $scope.exercise.default_content[key];
          selectFirstTab();
        }

        $scope.changeFileName = (key) => {
          var newName = prompt(translate('multiple_files_new_name'), key);
          if (!_.isEmpty(newName)) {
            $scope.addFile(newName, $scope.exercise.default_content[key]);
            delete $scope.exercise.default_content[key];
          }
        }

        $scope.getAceModeFromExtension = (key) => {
          return Languages.getAceModeFromExtension(extension(key));
        }

        $scope.getCommentFromExtension = (key) => {
          return Languages.getCommentFromExtension(extension(key));
        }

        if (isInvalidMultiFile()) {
          $scope.exercise.default_content = {};
          $scope.addFile();
        }

        selectFirstTab();

      }

    }

  })

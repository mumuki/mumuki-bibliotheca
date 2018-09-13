angular
  .module('editor')
  .directive('multipleFiles', function (Languages) {

    return {

      restrict: 'E',
      templateUrl: 'views/directives/multiple-files.html',
      scope: {
        exercise: '='
      },
      controller: ($scope) => {

        let activeTab;

        const isInvalidMultiFile = () => [_.isString, _.isEmpty].some((f) => f($scope.exercise.default_content));
        const selectFirstTab = () => activeTab = _.chain($scope.exercise.default_content).keys().first().value();
        const extension = (key) => _.chain(key).split('.').last().value();

        $scope.select = (key) => {
          activeTab = key
        }

        $scope.isActive = (key) => {
          return activeTab === key;
        }

        $scope.addFile = () => {
          const key = `file_${_.keys($scope.exercise.default_content).length + 1}.${$scope.exercise.fullLanguage().extension}`;
          $scope.exercise.default_content[key] = '';
          $scope.select(key);
        }

        $scope.removeFile = (key) => {
          delete $scope.exercise.default_content[key];
          selectFirstTab();
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

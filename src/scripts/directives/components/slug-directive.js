angular
  .module('editor')
  .directive('slug', function(Auth,
                              CurrentItem) {

    return {

      restrict: 'E',
      templateUrl: 'views/directives/components/slug.html',
      scope: {
        item: '=',
      },
      controller: ($scope) => {

        $scope.isSuperUser = Auth.isSuperUser();
        $scope.organizations = Auth.organizations();

        $scope.getOrganization = CurrentItem.getOrganization;
        $scope.setOrganization = CurrentItem.setOrganization;

        $scope.selected = {
          get organization() {
            return $scope.getOrganization();
          },
          set organization(organization) {
            $scope.setOrganization(organization);
          }
        }

      }

    }

  })



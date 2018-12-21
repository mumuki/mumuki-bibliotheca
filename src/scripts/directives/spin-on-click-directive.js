angular
  .module('editor')
  .directive('spinOnClick', function ($parse) {
    return {
      restrict: 'A',
      scope: {
        submit: '&spinOnClick'
      },
      link: (scope, element, attr) => {

        let html;

        element.on('click', () => {
          html = element.html();
          addSpinClass();
          scope.submit().then(removeSpinClass, removeSpinClass);
        });

        const removeSpinClass = (result) => {
          element.html(html);
          element.prop('disabled', false);
          return result;
        };

        const addSpinClass = () => {
          element.html('');
          element.append('<i class="fa fa-fw fa-spin fa-spinner"></i>');
          element.prop('disabled', true);
        };

      }
    };
  });

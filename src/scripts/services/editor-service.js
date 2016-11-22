angular
  .module('editor')
  .service('Editor', function() {

    const editorType = {
      code: {
        icon() {
          return 'fa-code';
        },
      },
      multiple_choice: {
        icon() {
          return 'fa-check-square-o';
        },
      },
      single_choice: {
        icon() {
          return 'fa-check-circle-o';
        },
      },
      hidden: {
        icon() {
          return 'fa-eye-slash';
        },
      },
      text: {
        icon() {
          return 'fa-file-text-o';
        },
      },
    }

    this.default = () => {
      return editorType.code;
    }

    this.types = () => {
      return _.keys(editorType);
    }

    this.from = (type) => {
      return editorType[type] || this.default();
    }

  });

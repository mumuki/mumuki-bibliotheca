angular
  .module('editor')
  .service('Layouts', function() {

    const input = {
      right: {
        icon() {
          return 'fa fa-columns';
        },
        type() {
          return 'input_right';
        },
        next() {
          return input.bottom;
        }
      },
      bottom: {
        icon() {
          return 'fa fa-list-alt';
        },
        type() {
          return 'input_bottom';
        },
        next() {
          return input.right;
        }
      }
    }

    this.input_right = input.right;
    this.input_bottom = input.bottom;

    this.default = () => {
      return this.input_right;
    }

    this.from = (type) => {
      return this[type] || this.default();
    }

  });

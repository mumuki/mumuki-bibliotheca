angular
  .module('editor')
  .service('Layouts', function() {

    const input = {
      right: {
        icon() {
          return 'da-input-right';
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
          return 'da-input-bottom';
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

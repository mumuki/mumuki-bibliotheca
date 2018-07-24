angular
  .module('editor')
  .directive('gobstonesTest', function ($filter) {

    return {

      restrict: 'E',
      templateUrl: 'views/directives/evaluation/gobstones-test.html',
      scope: {
        exercise: '='
      },
      controller: ($scope) => {

        const translate = $filter('translate');

        const TABLE = [[{}, {}], [{}, {}]];
        const HEADER = [[{}, {}], [{}, {}]];

        const INIT_GBS_BOARD = [{ table: TABLE, header: HEADER, update: _.noop }]

        const INITIAL = 0;
        const FINAL = 1;

        const getGbsBoards = () => {
          const gbs = $('gs-board');
          return (!_.isEmpty(gbs)) ? gbs : $(_.times(2, _.constant(INIT_GBS_BOARD)));
        }

        const update = (gsBoard) => {
          gsBoard.update && gsBoard.update(gsBoard.table, gsBoard.header);
        }

        const updateSize = (gsBoards, size) => {
          gsBoards.each((index) => {
            const gsBoard = gsBoards[index];
            gsBoard.table = _.times(size.y, (ny) => {
              return _.times(size.x, (nx) => _.get(gsBoard, `table[${ny}][${nx}]`, {}))
            })
            update(gsBoard);
          });
        }

        const updateHeader = (gsBoard, header) => {
          gsBoard.header = _.omitBy(header, (value) => value < 0);
          update(gsBoard);
        }

        const updateTest = () => {
          $scope.exercise.test = [
            `check_head_position: ${getCheckHeadPosition()}`,
            `examples:`,
            ` - initial_board: ${getInitialBoardString()}`,
            `   final_board: ${getFinalBoardString()}`,
          ].join('\n')
          console.log($scope.exercise.test);
        }

        const getCheckHeadPosition = () => true;
        const getInitialBoardString = () => getBoardStringFrom(getInitialBoard());
        const getFinalBoardString = () => getBoardStringFrom(getFinalBoard());

        const getBoardStringFrom = (gsBoard) => {
          return _([`|`,
            `     GBB/1.0`,
            `     size ${$scope.size.x} ${$scope.size.y}`,
            getTableString(gsBoard.table),
            `     head ${gsBoard.header.x} ${gsBoard.header.y}`
          ])
          .filter(_.flowRight(_.identity, _.trim))
          .join('\n');
        }

        const getTableString = (table) => {
          return table
            .map((row, y) => row
              .map((cell, x) => getCellString(cell, x, y))
              .filter(_.flowRight(_.identity, _.trim))
              .join('\n')
            ).join('\n');
        }

        const getCellString = (cell, x, y) => {
          if (_.isEmpty(cell)) return '';
          let text = `     cell ${x} ${y} `;
          _(cell).forIn((value, key) => text += `${_.upperFirst(key)} ${value} `);
          return text;
        }

        const getInitialBoard = () => getGbsBoards()[INITIAL];
        const getFinalBoard = () => getGbsBoards()[FINAL];

        $scope.size = {
          x: 2,
          y: 2,
        }

        $scope.header = {
          initial: { x: 0, y: 0 },
          final: { x: 0, y: 0 },
        }

        $scope.$watch('size', () => {
          updateSize(getGbsBoards(), $scope.size);
          updateTest();
        }, true);

        $scope.$watch('header', () => {
          updateHeader(getInitialBoard(), $scope.header.initial);
          updateHeader(getFinalBoard(), $scope.header.final);
          updateTest();
        }, true);

        $scope.$watch(() => getInitialBoard().table, updateTest, true);
        $scope.$watch(() => getFinalBoard().table, updateTest, true);

      }
    }

  })

angular
  .module('editor')
  .directive('gobstonesTest', function ($filter,
                                        $timeout) {

    return {

      restrict: 'E',
      templateUrl: 'views/directives/evaluation/gobstones-test.html',
      scope: {
        exercise: '='
      },
      controller: ($scope) => {

        const loadGbbReader = () => {
          if (!window.gbbReader) return $timeout(loadGbbReader);

          const translate = $filter('translate');

          const GBB = [`|`,
            `     GBB/1.0`,
            `     size 2 2`,
            `     head 0 0`,
          ].join('\n')

          const TEST = jsyaml.load($scope.exercise.test);
          const getTestExample = () => _.get(TEST, 'examples[0]', [{initial_board: GBB, final_board: GBB}]);
          const getTestCheckHeadPosition = () => _.get(TEST, 'check_head_position', false);

          const BOARDS = {
            initial: gbbReader.fromString(getTestExample().initial_board),
            final: gbbReader.fromString(getTestExample().final_board),
          };

          const INITIAL = {
            index: 0,
            table: BOARDS.initial.table,
            header: BOARDS.final.head,
            update: _.noop
          };
          const FINAL = {
            index: 1,
            table: BOARDS.final.table,
            header: BOARDS.final.head,
            update: _.noop
          };

          const getGbsBoards = () => {
            const gbs = $('gs-board');
            return (!_.isEmpty(gbs)) ? gbs : $([INITIAL, FINAL]);
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

          const getCheckHeadPosition = () => $scope.header.checkPosition;
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
                .join('\n'))
              .filter(_.flowRight(_.identity, _.trim))
              .join('\n');
          }

          const getCellString = (cell, x, y) => {
            if (_.isEmpty(cell)) return '';
            let text = `     cell ${x} ${$scope.size.y - 1 - y} `;
            _(cell).forIn((value, key) => text += `${_.upperFirst(translate(key))} ${value} `);
            return text;
          }

          const getInitialBoard = () => getGbsBoards()[INITIAL.index];
          const getFinalBoard = () => getGbsBoards()[FINAL.index];

          $scope.initial_board = INITIAL;
          $scope.final_board = FINAL;

          $scope.size = {
            x: BOARDS.initial.width,
            y: BOARDS.initial.height,
          }

          $scope.header = {
            initial: BOARDS.initial.head,
            final: BOARDS.final.head,
            checkPosition: getTestCheckHeadPosition(),
          }

          $scope.getInitialState = () => {
            return getTestExample().initial_board;
          }

          $scope.getFinalState = () => {
            return getTestExample().final_board;
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

          updateSize();
          updateHeader();

        }

        loadGbbReader();

      }
    }

  })

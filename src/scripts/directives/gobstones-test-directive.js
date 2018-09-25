import jsyaml from "js-yaml"

angular
  .module('editor')
  .directive('gobstonesTest', function ($translate,
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

          const gsAttire = $('gs-attire')[0];
          const gsBoardContainers = $('.gbs-board-table');

          if (_.isEmpty(gsAttire)) {
            const matches = $scope.exercise.description.match(/(<gs-attire\s*attire-url="\S*">\s*<\/gs-attire>)/gm);
            if (!_.isEmpty(matches)) {
              $('body').append($(matches[0]));
            }
          }

          gsBoardContainers.each((i) => {
            const gsBoard = $(gsBoardContainers[i]);
            gsBoard.width(gsBoard.parent().width() * 2/3);
            gsBoard.height(gsBoard.width());
          });

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
            head: { x: 0, y: 0 }
          };

          const INITIAL = {
            index: 0,
            table: BOARDS.initial.table,
            header: BOARDS.initial.head,
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
              updateGsBoardSize(gsBoards[index], size);
            });
          }

          const updateGsBoardSize = (gsBoard, size) => {
            updateGsBoardSizeY(gsBoard, size);
            updateGsBoardSizeX(gsBoard, size);
            update(gsBoard);
          }

          const updateGsBoardSizeY = (gsBoard, size) => {
            if (gsBoard.table.length > size.y) {
              _.times(gsBoard.table.length - size.y, () => gsBoard.table.shift());
            } else {
              _.times(size.y - gsBoard.table.length, () => gsBoard.table.unshift([]));
            }
          }

          const updateGsBoardSizeX = (gsBoard, size) => {
            gsBoard.table.forEach((row) => {
              if (row.length > size.x) {
                _.times(row.length - size.x, () => row.pop());
              } else {
                _.times(size.x - row.length, () => row.push({}));
              }
            })
          }

          const updateHeader = (gsBoard, header) => {
            gsBoard.header = header;
            update(gsBoard);
          }

          const updateScale = () => {
            gsBoardContainers.each((i) => {
              const gsBoardContainer = $(gsBoardContainers[i]);
              scale(gsBoardContainer);
            });
          }

          const scale = (gsBoardContainer) => {
            const board = gsBoardContainer.children('gs-board');
            board.css('transform', 'scale(1)');
            const boardSize = Math.max(board.width(), board.height());
            board.css('transform', `scale(${(gsBoardContainer.width() - 100) / boardSize})`);
          }

          const updateTest = () => {
            $scope.exercise.test = [
              `check_head_position: ${getCheckHeadPosition()}`,
              `examples:`,
              ` - initial_board: ${getInitialBoardString()}`,
              `   final_board: ${getFinalBoardString()}`,
            ].join('\n');
            updateScale();
          }

          const getCheckHeadPosition = () => $scope.header.checkPosition;
          const getInitialBoardString = () => getBoardStringFrom(getInitialBoard());
          const getFinalBoardString = () => getBoardStringFrom(getFinalBoard());

          const isEmptyGBBCell = (row = '') => row.trim().match(/^(cell \d+ \d+|)$/);

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
              .map((row, y) => _.chain(row)
                .map((cell, x) => getCellString(cell, x, y))
                .filter(_.flowRight(_.identity, _.trim))
                .join('\n')
                .value())
              .filter(_.flowRight(_.identity, _.trim))
              .join('\n');
          }

          const getCellString = (cell, x, y) => {
            if (_.isEmpty(cell)) return '';
            let text = `     cell ${x} ${$scope.size.y - 1 - y} `;
            _(cell).forIn((value, key) => text += (value > 0 ? `${_.upperFirst(translate(key))} ${value} `: ''));
            if (isEmptyGBBCell(text)) text = '';
            return text;
          }

          const translate = (key) => $translate.instant(key, {}, undefined, 'es');

          const getInitialBoard = () => getGbsBoards()[INITIAL.index];
          const getFinalBoard = () => getGbsBoards()[FINAL.index];

          const updateInputs = () => {
            $scope.header.initial.x = Math.min($scope.size.x - 1, $scope.header.initial.x);
            $scope.header.initial.y = Math.min($scope.size.y - 1, $scope.header.initial.y);
            $scope.header.final.x = Math.min($scope.size.x - 1, $scope.header.final.x);
            $scope.header.final.y = Math.min($scope.size.y - 1, $scope.header.final.y);
          }

          $scope.initial_board = INITIAL;
          $scope.final_board = FINAL;

          $scope.attire = {
            show: true
          }

          $scope.size = {
            _x: BOARDS.initial.width,
            _y: BOARDS.initial.height,
            get x() { return this._x },
            get y() { return this._y },
            set x(v) { this._x = v; updateInputs() },
            set y(v) { this._y = v; updateInputs() },
          }

          $scope.header = {
            initial: BOARDS.initial.head,
            final: BOARDS.final.head,
            checkPosition: getTestCheckHeadPosition(),
          }

          $scope.getInitialState = () => getTestExample().initial_board;
          $scope.getFinalState = () => getTestExample().final_board;

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

        loadGbbReader();

      }
    }

  })

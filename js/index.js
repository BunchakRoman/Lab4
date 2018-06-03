var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// ========================================
// Компонент Square
// ========================================
// Функция возвращает клетку для рендера при клике по ней 
// передается событие в родительский компонент, при клике по клетке
// благодаря props.value отображается X или O 
function Square(props) {
  return React.createElement(
    "button",
    { className: "square", onClick: props.onClick },
    " ",
    props.value,
    " "
  );
}

// ========================================
// Компонент Board
// ========================================
// В компоненте происходит сбока клеток в кострукцию по три клетки в три ряда 
// и передача данных от компонента Square в комопнент Game

var Board = function (_React$Component) {
  _inherits(Board, _React$Component);

  function Board() {
    _classCallCheck(this, Board);

    return _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).apply(this, arguments));
  }

  _createClass(Board, [{
    key: "renderSquare",

    // Функция renderSquare(i) служит для формирования данных и событий для компонента Square
    // а та же для размножения клеток и передачи их в главный компонент Game
    // i выполняет роль нумерованого ключа для кнопок в их массиве
    value: function renderSquare(i) {
      var _this2 = this;

      return React.createElement(Square, {
        value: this.props.squares[i],
        onClick: function onClick() {
          return _this2.props.onClick(i);
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "board-row" },
          this.renderSquare(0),
          this.renderSquare(1),
          this.renderSquare(2)
        ),
        React.createElement(
          "div",
          { className: "board-row" },
          this.renderSquare(3),
          this.renderSquare(4),
          this.renderSquare(5)
        ),
        React.createElement(
          "div",
          { className: "board-row" },
          this.renderSquare(6),
          this.renderSquare(7),
          this.renderSquare(8)
        )
      );
    }
  }]);

  return Board;
}(React.Component);

// ========================================
// Компонент Game
// ========================================


var Game = function (_React$Component2) {
  _inherits(Game, _React$Component2);

  // Конструктор класса
  function Game() {
    _classCallCheck(this, Game);

    // Устанавливаем первоночльное состояние this.state.history - пустой масив с 9 элементами null, 
    // this.state.stepNumber - номер шага и this.state.xIsNext - true или false для определения кто следующий делает ход
    var _this3 = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this));

    _this3.state = {
      history: [{ squares: Array(9).fill(null) }],
      stepNumber: 0,
      xIsNext: true
    };
    return _this3;
  }
  // Слушател событий принимает номер клетки, выполняются действия 
  // и вычичления, при клике по любой из неактивированых клеток 


  _createClass(Game, [{
    key: "handleClick",
    value: function handleClick(i) {
      // Копируем! в history массив с объектом созданный из текущего состояние this.state.history 
      // (от начал массива до номера текущего хода)
      var history = this.state.history.slice(0, this.state.stepNumber + 1);
      // Записываем в current объект над которым производится работа извлекая его из массива
      var current = history[history.length - 1];
      // Копируем! в squares массив отмеченых и пустых клеток
      var squares = current.squares.slice();

      // Если текущий массив содержит выигрышную комбинацию выходим из обработки события 
      if (calculateWinner(squares) || squares[i]) {
        return;
      }

      // В зависимости от того чей ход передаем для заполнения поля в массиве squares буквами X или O 
      squares[i] = this.state.xIsNext ? "X" : "O";

      // Добавлем в this.state.history объект с массивом содержащим последнее состояние игрового поля
      // обновляем значение this.state.stepNumber прописывая номер текущего хода
      // передаем ход следующему игроку записывая в this.state.xIsNext - true или false
      this.setState({
        history: history.concat([{ squares: squares }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext
      });
    }

    // слушатель событий по клику позволяющий перемещатся по игровому процессу возвращаясь назад
    //

  }, {
    key: "jumpTo",
    value: function jumpTo(step) {
      // Принимает номер шага в игре на который надо перейти и меняет значения 
      // в this.state.stepNumber и this.state.xIsNext 
      this.setState({
        stepNumber: step,
        xIsNext: step % 2 === 0 // true или false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      // Записываем в переменную history историю игры на данный момент
      var history = this.state.history;
      // Записываем в переменную current объект над которым производится работа извлекая его из массива history
      var current = history[this.state.stepNumber];
      // Записываем в переменную winner результат определения победителя на основе текущего состояния игры
      var winner = calculateWinner(current.squares); // X, O или null

      // Записываем в переменную moves резултат работы метода map() который перебирая элементы в массиве history 
      // Позволяет сформировать список ходов, move представляет собой номер шага в игре
      var moves = history.map(function (step, move) {
        var desc = move ? "Ход №" + move : "Начать игру";
        return React.createElement(
          "li",
          { key: move },
          React.createElement(
            "a",
            { href: "#", onClick: function onClick() {
                return _this4.jumpTo(move);
              } },
            " ",
            desc,
            " "
          )
        );
      });

      // Записываем в переменную status строку с информацией о текущем состоянии игры
      // Сообщаем кто сейчас играет или кто победил или ничья  
      var status = void 0;
      if (winner) {
        status = "Победитель: " + winner;
      } else if (this.state.stepNumber === 9 && winner === null) {
        status = "Игровая Ничья";
      } else {
        status = "Сейчас играет: " + (this.state.xIsNext ? "X" : "O");
      }

      // передаем для рендера основную разметку игры, монтируем отображение информации об игре, 
      // список ходов и комопнент Board с пераметрами о текущем состоянии игры что неоходимо 
      // для визуально отображения заполнения клеток Х или О,
      // а так же слушатель событий для обработки следующего клика по одной из неактивных кнопок
      return React.createElement(
        "div",
        { className: "game" },
        React.createElement(
          "div",
          { className: "game-board" },
          React.createElement(Board, {
            squares: current.squares,
            onClick: function onClick(i) {
              return _this4.handleClick(i);
            }
          })
        ),
        React.createElement(
          "div",
          { className: "game-info" },
          React.createElement(
            "div",
            null,
            " ",
            status,
            " "
          ),
          React.createElement(
            "ol",
            null,
            " ",
            moves,
            " "
          )
        )
      );
    }
  }]);

  return Game;
}(React.Component);
// ========================================
// Функция выигрышных комбинаций
// ========================================


function calculateWinner(squares) {
  // в массиве собраны все выигрышные компбинации  
  var lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  // сравниваем комбинации из активированных клеток с выигрышными комбинациями
  for (var i = 0; i < lines.length; i++) {
    var _lines$i = _slicedToArray(lines[i], 3),
        a = _lines$i[0],
        b = _lines$i[1],
        c = _lines$i[2];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================
// Установка компонента Game на странице
// ========================================
ReactDOM.render(React.createElement(Game, null), document.getElementById('root'));
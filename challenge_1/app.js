let gameState = {

  gameEnded: false,
  xTurn: true,
  turn: 'X'

};

let userInput = {

  clickedSquare: (event) => {
    if (!gameState.gameEnded) {
      var square = event.target;

      if (square.innerHTML !== "") {
        alert('already taken!');
      } else {
        presentation.changeSquare(square);
      }

      if(presentation.checkWin(square)) {
        alert(`${gameState.turn} wins!`);
        gameState.gameEnded = true;
        gameState.xTurn = !gameState.xTurn;
        gameState.turn = gameState.xTurn === true ? 'O' : 'X';
        presentation.addWin(gameState.xTurn);
      }

      if(presentation.checkTie()) {
        alert('tie game!');
        gameState.gameEnded = true;
      }
    };
  },

  resetGame: () => {
    var allItems = document.querySelectorAll('td');
    Array.from(allItems).forEach(element => {
      element.innerHTML = '';
    });
    gameState.gameEnded = false;
  }

};

let presentation = {

  addWin: (xWinner) => {
    if (xWinner) {
      document.getElementsByClassName('xWins')[0].innerHTML = Number(document.getElementsByClassName('xWins')[0].innerHTML) + 1;
    } else {
      document.getElementsByClassName('oWins')[0].innerHTML = Number(document.getElementsByClassName('oWins')[0].innerHTML) + 1;
    }
  },

  changeSquare: (square) => {
    if (gameState.xTurn) square.innerHTML = 'X';
    else square.innerHTML = 'O';
    gameState.xTurn = !gameState.xTurn;
    gameState.turn = gameState.xTurn === true ? 'O' : 'X';
  },


  checkTie: () => {

    if(gameState.gameEnded) return false;

    var allItems = document.querySelectorAll('td');
    return Array.from(allItems).every(element => {
      return element.innerHTML != '';
    });
  },


  checkWin: (square) => {
    // columns
    var columnIndex = square.classList[1];
    var columnItems = document.querySelectorAll(`.${columnIndex}`);
    var colStatus = Array.from(columnItems).every(element => {
      return element.innerHTML === gameState.turn;
    })
    // rows
    var rowIndex = square.classList[0];
    var rowItems = document.querySelectorAll(`.${rowIndex}`);
    var rowStatus = Array.from(rowItems).every(element => {
      return element.innerHTML === gameState.turn;
    })
    // diagonals
    var checkDiagonalOne = square.classList.contains('d1');
    var checkDiagonalTwo = square.classList.contains('d2');

    if (checkDiagonalOne) {
      var d1Items = document.querySelectorAll('.d1');
      var d1Status = Array.from(d1Items).every(element => {
        return element.innerHTML === gameState.turn;
      });
    }

    if (checkDiagonalTwo) {
      var d2Items = document.querySelectorAll('.d2');
      var d2Status = Array.from(d2Items).every(element => {
        return element.innerHTML === gameState.turn;
      });
    }

    return (colStatus || rowStatus || d1Status || d2Status);
  }

};
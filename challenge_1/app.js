var gameEnded = false;
var xTurn = true;
var turn = xTurn === true ? 'O' : 'X';


function clickedSquareHandler(event) {
  if (!gameEnded) {
    var clickedSquare = event.target;

    if (clickedSquare.innerHTML !== "") {
      alert('already taken!');
    } else {
      changeSquare(clickedSquare);
    }

    if(checkWin(clickedSquare)) {
      alert(`${turn} wins!`);
      gameEnded = true;
      xTurn = !xTurn;
      turn = xTurn === true ? 'O' : 'X';
      addWin(xTurn);
    }

    if(checkTie()) {
      alert('tie game!');
      gameEnded = true;
    }
  };
}


function changeSquare(square) {
  if (xTurn) square.innerHTML = 'X';
  else square.innerHTML = 'O';
  xTurn = !xTurn;
  turn = xTurn === true ? 'O' : 'X';
}


function checkTie() {

  if(gameEnded) return false;

  var allItems = document.querySelectorAll('td');
  return Array.from(allItems).every(element => {
    return element.innerHTML != '';
  });
}


function checkWin(square) {
  // columns
  var columnIndex = square.classList[1];
  var columnItems = document.querySelectorAll(`.${columnIndex}`);
  var colStatus = Array.from(columnItems).every(element => {
    return element.innerHTML === turn;
  })
  // rows
  var rowIndex = square.classList[0];
  var rowItems = document.querySelectorAll(`.${rowIndex}`);
  var rowStatus = Array.from(rowItems).every(element => {
    return element.innerHTML === turn;
  })
  // diagonals
  var checkDiagonalOne = square.classList.contains('d1');
  var checkDiagonalTwo = square.classList.contains('d2');

  if (checkDiagonalOne) {
    var d1Items = document.querySelectorAll('.d1');
    var d1Status = Array.from(d1Items).every(element => {
      return element.innerHTML === turn;
    });
  }

  if (checkDiagonalTwo) {
    var d2Items = document.querySelectorAll('.d2');
    var d2Status = Array.from(d2Items).every(element => {
      return element.innerHTML === turn;
    });
  }

  return (colStatus || rowStatus || d1Status || d2Status);
}

function addWin(xWinner) {
  if (xWinner) {
    document.getElementsByClassName('xWins')[0].innerHTML = Number(document.getElementsByClassName('xWins')[0].innerHTML) + 1;
  } else {
    document.getElementsByClassName('oWins')[0].innerHTML = Number(document.getElementsByClassName('oWins')[0].innerHTML) + 1;
  }
}


function resetGame() {
  var allItems = document.querySelectorAll('td');
  Array.from(allItems).forEach(element => {
    element.innerHTML = '';
  });
  gameEnded = false;
  // xTurn = true;
  // turn = 'X';
}
import React from 'react';
import Board from './board.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameEnded: false,
      turn: 'Red',
      rows: [
        ['', '', '', '', '', '', ''], 
        ['', '', '', '', '', '', ''], 
        ['', '', '', '', '', '', ''], 
        ['', '', '', '', '', '', ''], 
        ['', '', '', '', '', '', ''], 
        ['', '', '', '', '', '', '']
      ]
    };

    this.dropPiece = this.dropPiece.bind(this);

  }

  dropPiece(columnString) {
    if (!this.state.gameEnded) {
      var columnIndex = Number(columnString) - 1; 
      var newRows = this.state.rows.slice();
      var currentTurn = this.state.turn;
      var rowIndex = 5;

      function stackUp(row) {
        if (newRows[row][columnIndex] === '') {
          newRows[row][columnIndex] = currentTurn;
          return true;
        }
        if (row > 0) {
          rowIndex--;
          return stackUp(row - 1);
        } else {
          return false;
        }
      }

      var hasDropped = stackUp(5);
      
      if (hasDropped) {
        currentTurn = currentTurn === 'Red' ? 'Black' : 'Red';
        
        var newState = {
          rows: newRows,
          turn: currentTurn,
          gameEnded: false
        };

        if (checkWin(newRows, rowIndex, columnIndex)) {
          newState.gameEnded = true;
          alert(`${this.state.turn} wins!`);
        }
      
        this.setState(newState);

      } else {
        alert('Choose another column!');
      }
    }
    if (checkTie(this.state.rows)) {
      alert('Tie Game!');
      this.setState({gameEnded: true});
    }
  }


  render() {
    return ( 
      <div>
        <h1>Connect Four!</h1>
        <p>select a column:</p>
        <Board rows={this.state.rows} dropPiece={this.dropPiece}/>
      </div>
    );
  }
}

export default App;

function checkWin(board, row, column) {
  return horizontal(board, row) || vertical(board, column) || diagonals(board, row, column);
}

function checkTie(rows) {
  var result = rows[0].every((element) => {
    return element !== '';
  });

  return result;
}


function horizontal(board, row) {
  var currentPiece = '';
  var count = 1;
  var win = false;

  board[row].forEach((piece) => {
    if (piece === '' || piece !== currentPiece) {
      currentPiece = piece;
      count = 1;
    } else {
      count++;
      if (count === 4) win = true;
    }
  });

  return win;
}


function vertical(board, column) {
  var currentPiece = '';
  var count = 1;
  var win = false;

  board.forEach((row) => {
    if (row[column] === '' || row[column] !== currentPiece) {
      currentPiece = row[column];
      count = 1;
    } else {
      count++;
      if (count === 4) win = true;
    }
  });

  return win;
}


function diagonals(board, row, column) {
  var diagonal1 = [];
  var diagonal2 = [];

  var min = Math.min(row, column);
  var d1spots = [row - min, column - min];
  
  while (d1spots[0] < 6 && d1spots[1] < 7) {
    diagonal1.push(board[d1spots[0]][d1spots[1]]);
    d1spots = [d1spots[0] + 1, d1spots[1] + 1];
  }

  var d2spots = [ row, column ];
  
  while (d2spots[0] < 5 && d2spots[1] > 0) {
    d2spots = [d2spots[0] + 1, d2spots[1] - 1];
  }

  while (d2spots[0] > 0 && d2spots[1] < 7) {
    diagonal2.push(board[d2spots[0]][d2spots[1]]);
    d2spots = [d2spots[0] - 1, d2spots[1] + 1];
  }
  
  return (diagonal1.join('').includes('RedRedRedRed') || diagonal1.join('').includes('BlackBlackBlackBlack')) || (diagonal2.join('').includes('RedRedRedRed') || diagonal2.join('').includes('BlackBlackBlackBlack'));  
}
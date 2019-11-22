import React from 'react';
import Row from './boardRow.jsx';

class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return ( 
      <div>
        <table>
          <thead>
            <tr>
              <th onClick={(event) => {this.props.dropPiece(event.target.innerHTML)}}>1</th>
              <th onClick={(event) => {this.props.dropPiece(event.target.innerHTML)}}>2</th>
              <th onClick={(event) => {this.props.dropPiece(event.target.innerHTML)}}>3</th>
              <th onClick={(event) => {this.props.dropPiece(event.target.innerHTML)}}>4</th>
              <th onClick={(event) => {this.props.dropPiece(event.target.innerHTML)}}>5</th>
              <th onClick={(event) => {this.props.dropPiece(event.target.innerHTML)}}>6</th>
              <th onClick={(event) => {this.props.dropPiece(event.target.innerHTML)}}>7</th>
            </tr>
          </thead>
          <tbody>
            {this.props.rows.map((row) => {
              return <Row data={row}/>;
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Board;
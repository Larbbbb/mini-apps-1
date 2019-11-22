import React from 'react';

class Row extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return ( 
      <tr>
        <td className={this.props.data[0]}></td>
        <td className={this.props.data[1]}></td>
        <td className={this.props.data[2]}></td>
        <td className={this.props.data[3]}></td>
        <td className={this.props.data[4]}></td>
        <td className={this.props.data[5]}></td>
        <td className={this.props.data[6]}></td>
      </tr>
    );
  }
}

export default Row;
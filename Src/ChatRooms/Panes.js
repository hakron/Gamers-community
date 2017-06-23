import React from 'react';
import axios from '../axios';

export default class Panes extends React.Component{
  constructor(props) {
    super(props);
    this.state ={}

  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

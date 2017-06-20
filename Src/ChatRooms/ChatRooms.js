import React from 'react';
import Tabs from './Tabs';
import Panes from './Panes';
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';

export default class ChatRooms extends React.Component{
  constructor(props) {
    super(props);
    this.state ={ }
  }
  render() {
      return (
        <div>
        asdasdasdasdasd
          <Tabs selected={0}>
            <Panes label="Tab 1">
              <div>This is my tab 1 contents!</div>
            </Panes>
            <Panes label="Tab 2">
              <div>This is my tab 2 contents!</div>
            </Panes>
            <Panes label="Tab 3">
              <div>This is my tab 3 contents!</div>
            </Panes>
          </Tabs>
        </div>
      );
    }
  }

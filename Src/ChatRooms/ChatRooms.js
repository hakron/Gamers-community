import React from 'react';
import Tabs from './Tabs';
import Panes from './Panes';
import Chat from './Chat';
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';

export default class ChatRooms extends React.Component{
  constructor(props) {
    super(props);
    this.state ={ }
  }
  render() {
      return (
        <div>
          <Tabs selected={0}>
            <Panes label="Main Room">
              <Chat chatRoomName="Main Room"/>
            </Panes>

            <Panes label="World of Warcraft">
              <Chat chatRoomName="World of Warcraft"/>
            </Panes>

            <Panes label="League of Legends">
              <Chat chatRoomName="League of Legends"/>
            </Panes>

            <Panes label="Counter Strike">
              <Chat chatRoomName="Counter Strike"/>
            </Panes>

            <Panes label="Squad">
              <Chat chatRoomName="Squad"/>
            </Panes>
          </Tabs>
        </div>
      );
    }
  }

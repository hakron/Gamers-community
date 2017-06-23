import React from 'react';
import axios from '../axios';
import {Button, Form, Image, Modal} from 'react-bootstrap';

import {Link, browserHistory} from 'react-router';
import {Button} from 'react-bootstrap';
import axios from 'axios';
import * as io from 'socket.io-client';
const socket = io.connect();
export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessages: [],
      currentLoggedInUser: {}
    };
  }
}

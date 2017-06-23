import React from 'react';
import axios from '../axios';
import AppNav from './AppNav';
// import SearchGames from './SearchGames';
import {Button, Form, Image, FormGroup, ControlLabel, FormControl, Modal} from 'react-bootstrap';
import {Router, Route, Link, IndexRoute, hashHistory, browserHistory, IndexLink } from 'react-router';
//change name to App?
export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state ={ }

  }

    render() {
      const children = React.cloneElement(this.props.children, {
        username: this.state.username,
        profilePicUrl: this.state.profilePicUrl,
        bio: this.state.bio
      });
      return (
      <div id="main-cnt">
        <AppNav/>
        {this.props.children}

      </div>
      );
    }
  }

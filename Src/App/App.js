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
  componentDidMount() {

  }
    render() {
      return (
      <div id="main-cnt">
        <AppNav/>
        {this.props.children}
        
      </div>
      );
    }
  }

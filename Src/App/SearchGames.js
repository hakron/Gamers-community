import React from 'react';
import axios from '../axios';
import {Button, Form, Image, FormGroup, ControlLabel, FormControl, Modal} from 'react-bootstrap';
import {Router, Route, Link, IndexRoute, hashHistory, browserHistory, IndexLink } from 'react-router';
//change name to App?
export default class SearchGames extends React.Component{
  constructor(props) {
    super(props);
    this.state ={ }

  }
  componentDidMount() {

  }
  render() {
    return (
      <div id="search-form">
      <FormGroup>
          <FormControl type="text" placeholder="Search" />
        </FormGroup>
        <Button type="submit"> Search </Button>
        </div>
    );
  }
}

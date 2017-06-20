import React from 'react';
import axios from '../axios';
import LoginForm from './LoginForm';
import Stream from './Stream';

import {Button, Form, Image, FormGroup, ControlLabel, FormControl, Checkbox} from 'react-bootstrap';
import { Link } from 'react-router';

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount(){
    console.log("LoginPage componentDidMount");
    axios({
      method: 'get',
      url: 'https://api.twitch.tv/kraken/streams/?limit=3',
      dataType: 'json',
      headers: {
        'Client-ID': 'duecfq1es6f5rgg0bxny2jgir00ggz'
      }
    }).then((response) => {
      console.log(response);
        this.setState({ streams: response.data.streams }, function(){
          console.log("inside setState finished");
          console.log(this.state.streams);
        });
    }).catch(function(err){
      console.log(err);
    })
  }
  renderStreams() {
      console.log("renderStreams started", this.state.streams);
    return this.state.streams.map((stream)=> {
      return (
        <Stream stream = {stream}/>
      );
    });

  }
  render(){
    return (
      <div>
        <LoginForm/>
        <div id="streams-cnt">
        {this.state.streams && this.renderStreams()}
        </div>
        <div id="cover"></div>
      </div>
    );
  }
}

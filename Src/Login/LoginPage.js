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
    axios({
      method: 'get',
      url: 'https://api.twitch.tv/kraken/streams/?limit=3',
      dataType: 'json',
      headers: {
        'Client-ID': 'duecfq1es6f5rgg0bxny2jgir00ggz'
      }
    }).then((response) => {
        this.setState({ streams: response.data.streams }, function(){
        });
    }).catch(function(err){
      console.log(err);
    })
  }
  renderStreams() {
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

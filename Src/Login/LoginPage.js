import React from 'react';
import axios from '../axios';
import LoginForm from './LoginForm';
// import {getChannelInfo, getStreamInfo} from './Api/Api';
import {Button, Form, Image, FormGroup, ControlLabel, FormControl, Checkbox} from 'react-bootstrap';
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  // componentDidMount(){
  //   axios({
  //     method: 'get',
  //     url: 'https://api.twitch.tv/kraken/streams/',
  //     dataType: 'json',
  //     stream_type: 'live',
  //     limit: 5,
  //     headers: {
  //       'Client-ID': 'duecfq1es6f5rgg0bxny2jgir00ggz'
  //     },
  //     success: (response) => {
  //       status = response.stream.channel.status;
  //       online = true;
  //       icon = response.stream.channel.logo;
  //       user = response.stream.channel.display_name;
  //       game = response.streams.channel.game,
  //       url = response.streams.channel.url,
  //       views = response.streams.channel.views,
  //     });
  //     this.setState({
  //       icon: icon,
  //       user: user,
  //       status: status,
  //       game: game,
  //       url: url,
  //       views: views
  //     });
  //   });
  // }
  render(){
    return (
      <div>
      <LoginForm/>
      <h1> {this.state.user} </h1>
      </div>
    );
  }
}

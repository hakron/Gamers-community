import React from 'react';
import axios from '../axios';
import WallContainer from '../WallFeed/WallContainer';
import {Button, Form, Image, FormGroup, ControlLabel, FormControl, Checkbox} from 'react-bootstrap';
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state ={}
}
  componentDidMount() {
    axios.get('/userProfileInfo').then((res) => {
      let profilePicUrl;
      if (res.data.results.profilePicUrl === null) {

        profilePicUrl = '/static/imgs/profilepic.png'
      } else {
        profilePicUrl = res.data.results.profilePicUrl;
      }
      this.setState({
        id: res.data.results.id,
        username:res.data.results.username,
        firstname: res.data.results.firstname,
        lastname: res.data.results.lastname,
        profilePicUrl: profilePicUrl,
      });
    });
  }
  render() {
    return (
      <div id="layer-profile">
        <div id="profile-cnt">
          <div id="profile-user-info">
            <Image src={this.state.profilePicUrl} responsive/>
            <p>{this.state.username} </p>
            <div id="bio">
            </div>
          </div>
        </div>
        <WallContainer/>
      </div>
    )
  }
}

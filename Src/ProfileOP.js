import React from 'react';
import axios from './axios';
import WallContainer from './WallFeed/WallContainer';
import FriendsButton from './Friends/FriendsButton';
import {Button, Form, Image, FormGroup, ControlLabel, FormControl, Checkbox} from 'react-bootstrap';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

export default class ProfileOP extends React.Component {
  constructor(props) {
    super(props);
    this.state ={}

  }
  componentDidMount() {

    axios.get(`/user/${this.id || this.props.params.id}/data`).then((res) => {
          if (res.data.redirect){
            return browserHistory.push('/');
          }
      let profilePicUrl;
      if (res.data.results.profilePicUrl === null ) {

        profilePicUrl = '/static/imgs/profilepic.png'
      } else {
        profilePicUrl = res.data.results.profilePicUrl;
      }

      let profileBio;
      if (res.data.results.bio == null) {

        profileBio= "No bio available"
      } else {
        profileBio = res.data.results.bio;
      }
      this.setState({
        username: res.data.results.username,
        firstname: res.data.results.firstname,
        lastname: res.data.results.lastname,
        country:res.data.results.country,
        city: res.data.results.city,
        profilePicUrl: res.data.results.profilePicUrl,
        profileBio: profileBio
      });
    });
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.params.id != this.props.params.id) {
      this.state = {};
      this.id = this.props.params.id;
      this.componentDidMount();
    }

  }

  render() {
    return (
      <div id="layer-profile">
        <div id="opp-profile-cnt">
          <div id="opp-profile-user-info">
            <Image src={this.state.profilePicUrl} thumbnail responsive/>
            <p>{this.state.username} </p>
            <p>{this.state.profileBio}</p>
            <p>{this.state.city}, {this.state.country} </p>
            <FriendsButton friendId={this.props.params.id}/>
            </div>
        </div>
        <WallContainer
          commentedId ={this.props.params.id}/>
      </div>
    )
  }
}

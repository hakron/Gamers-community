import React from 'react';
import axios from '../axios';
import {Button, Form, Image, FormGroup, ControlLabel, FormControl, Modal} from 'react-bootstrap';
import {Router, Route, Link, IndexRoute, hashHistory, browserHistory, IndexLink } from 'react-router';
// import SearchBar from './SearchBar';
export default class AppNav extends React.Component{
  constructor(props) {
    super(props);
    this.state ={ }

  }
  componentDidMount() {
    axios.get('/getUserProfileInfo').then((res) => {
      let profilePicUrl;
      if (res.data.results.profilePicUrl === null ) {

        profilePicUrl = '/static/imgs/profilepic.png'
      } else {
        profilePicUrl = res.data.results.profilePicUrl;
      }
      this.setState({
        id: res.data.results.id,
        username: res.data.results.username,
        firstname: res.data.results.firstname,
        lastname: res.data.results.lastname,
        profilePicUrl: profilePicUrl,
      });
    });
  }
  render() {
    return (

        <div id="header">
          <div id="profile-data">
            <div id="profile-pic">
            <Link to="/editProfile"><Image src={this.state.profilePicUrl} thumbnail responsive/> </Link>
            </div>
              <div id="user-name">
                <p id="user-info">{this.state.username}</p>
              </div>
              <div id="nav">
              <IndexLink to="/" activeClassName='active'>Profile</IndexLink>
              <Link to="friends" activeClassName='active'>Friends</Link>
              <Link to="chatRooms" activeClassName='active'>Chat Room</Link>
              <a href="https://www.polygon.com" target="_blank"> Polygon </a>
              <a href="https://www.twitch.com" target="_blank"> Twitch Tv </a>

              <a href="/logout"><Image src="/static/imgs/logout.png" responsive/> </a>
              </div>
              <div id="logo">
              <Image src="/static/imgs/Logo.png" responsive/>
              </div>
        </div>
      </div>

    );
  }
}

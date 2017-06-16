import React from 'react';
import axios from '../axios';
import {Button, Form, Image, FormGroup, ControlLabel, FormControl, Modal} from 'react-bootstrap';
import {Router, Route, Link, IndexRoute, hashHistory, browserHistory,IndexLink } from 'react-router';
//change name to App?
export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state ={ }
    // this.showNav = this.showNav.bind(this);
    // this.openModal = this.openModal.bind(this);
    // this.closeModal = this.closeModal.bind(this);
    // this.setImg = this.setImg.bind(this);
  }
  componentDidMount() {
    let profilePicUrl;
  if (res.data.results.profilePicUrl === null) {

    profilePicUrl = '/static/imgs/profilepic.png'
  } else {
    profilePicUrl = res.data.results.profilePicUrl;
  }
  }
  render() {
    // const children = React.cloneElement(this.props.children, {
    //   firstName: this.state.firstName,
    //   lastName: this.state.lastName,
    //   profilePicUrl: this.state.profilePicUrl,
    //   bio: this.state.bio
    // });
    //create a nav constructor???
    //   const nav = (
    //   <div id="main-nav">
    //     <div id="mySidenav">
    //       <IndexLink to="/" activeClassName='active'>Profile</IndexLink>
    //       <Link to="/friends" activeClassName='active'>Friends</Link>
    //       <Link to="/chatRoom" activeClassName='active'>Chat Room</Link>
    //       <a href="/logout">Log out</a>
    //     </div>
    //   </div>
    //
    // );
    return (
      <div id="main-cnt">
      <h1> we are in the main page </h1>
        <a href="/logout">Log out</a>
      </div>
    );
  }
}

// {children}

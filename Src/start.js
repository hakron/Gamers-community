import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute,  browserHistory } from 'react-router';
import * as io from 'socket.io-client';
import axios from './axios';
// <=====src=======>
import getSocket from './socket.js';
import RegisterForm from './Register/RegisterForm';
import LoginPage from './Login/LoginPage';
import App from './App/App';
import EditProfile from './EditProfile/EditProfile';
import Profile from './Profile/Profile';
import ChatRooms from './ChatRooms/ChatRooms';
import Friends from './Friends/Friends';
const userIsLoggedIn = location.pathname !='/welcome';
const main = document.querySelector('main')

console.log(location.pathname, userIsLoggedIn);

const notLoggedInRouter = (
  <Router history = {browserHistory}>
    <Route path='/welcome' component = {Welcome}>
      <IndexRoute component = {RegisterForm}/>
      <Route path='/login' component = {LoginPage}/>
    </Route>
  </Router>
  )
const loggedInRouter =(
  <Router history = {browserHistory}>
    <Route path='/' component = {App}>
      <Route path='profile' component = {Profile}/>
      <Route path='editProfile' component = {EditProfile}/>
      <Route path='chatRooms' component = {ChatRooms}/>
    </Route>
  </Router>
)
// <IndexRoute component = {Profile}/>
// <Route path='user/:id' component = {ProfileOP}/>
// <Route path='friends' component = {Friends}/>

var elem = location.pathname === '/welcome' ? notLoggedInRouter : loggedInRouter;

ReactDOM.render(elem, main);

function Welcome(props) {
  return (
    <div id="welcome">
      {props.children}
    </div>
  );
}
if(location.pathname !='/welcome') {
   getSocket();
}

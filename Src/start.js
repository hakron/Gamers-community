import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import * as io from 'socket.io-client';
import axios from './axios';
// <=====src=======>
import getSocket from './socket.js';
import RegisterForm from './Register/RegisterForm';
import LoginForm from './Login/LoginForm';
import App from './App/App';
const userIsLoggedIn = location.pathname !='/welcome';
const main = document.querySelector('main')

console.log(location.pathname, userIsLoggedIn);

const notLoggedInRouter = (
  <Router history = {hashHistory}>
    <Route path='/' component = {Welcome}>
      <IndexRoute component = {RegisterForm}/>
      <Route path='/login' component = {LoginForm}/>
    </Route>
  </Router>
  )
const loggedInRouter =(
  <Router history = {browserHistory}>
    <Route path='/' component = {App}>
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

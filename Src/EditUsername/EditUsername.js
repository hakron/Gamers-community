import React from 'react';
import axios from '../axios';
import {Button, Form, Image, FormGroup, ControlLabel, FormControl, Checkbox} from 'react-bootstrap';
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';

export default class EditUsername extends React.Component {
  constructor(props) {
    super(props);
    this.state ={}

    this.handleUsernameSubmit = this.handleUsernameSubmit.bind(this);
    this.closeUsernameModal = this.closeUsernameModal.bind(this);
    this.handleChangeUsername= this.handleChangeUsername.bind(this);
  }
  closeUsernameModal() {
    this.props.closeUsernameModal();
  }
  handleChangeUsername(e) {
    this.setState({
      [e.target.name] : e.target.value
    });
  }
  handleUsernameSubmit(e){
    const { username } = this.state;
    e.preventDefault();
    axios.post('/editUsername',{
      username
    })
    .then((res) => {
      let newUsername = res.data.username;
      return this.props.setUsername(newUsername);
    });
  }
  render() {
    return (

        <div id="username-modal">
            <div id="username-form">
            <input placeholder=" Choose an username" type="text" name="username"  maxlength="250" onChange={this.handleChangeUsername}/>
              <Button id="btn-upload" onClick={this.handleUsernameSubmit}>Post it</Button>
              <Button id="btn-close" onClick={this.closeUsernameModal}>Close</Button>
            </div>
        </div>

    )
  }
}

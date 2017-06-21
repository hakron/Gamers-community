import React from 'react';
import axios from '../axios';
import {Button, Form, Image, FormGroup, ControlLabel, FormControl, Checkbox} from 'react-bootstrap';
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';

export default class EditBio extends React.Component {
  constructor(props) {
    super(props);
    this.state ={}

    this.handleBioSubmit = this.handleBioSubmit.bind(this);
    this.closeBioModal = this.closeBioModal.bind(this);
    this.handleChangeBio = this.handleChangeBio.bind(this);
  }
  closeBioModal() {
    this.props.closeBioModal();
  }
  handleChangeBio(e) {
    console.log(e.target.bio);
    this.setState({
      [e.target.name] : e.target.value
    });
  }
  handleBioSubmit(e){
    const { bio } = this.state;
    e.preventDefault();
    axios.post('/editUserBio',{
      bio
    })
    .then((res) => {
      let newProfileBio = res.data.bio;
      return this.props.setBio(newProfileBio);
    });
  }
  render() {
    return (

        <div id="bio-modal">
            <div id="bio-form">
            <input type="text" name="bio"  maxlength="250" onChange={this.handleChangeBio}/>
              <Button id="btn-upload" onClick={this.handleBioSubmit}>Post it</Button>
              <Button id="btn-close" onClick={this.closeBioModal}>Close</Button>
            </div>
        </div>

    )
  }
}

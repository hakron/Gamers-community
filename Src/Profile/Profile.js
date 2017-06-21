import React from 'react';
import axios from '../axios';
import WallContainer from '../WallFeed/WallContainer';
import ImageModal from './ImageModal';
import EditBio from '../EditBio/EditBio';
import {Button, Form, Image, FormGroup, ControlLabel, FormControl, Checkbox, Modal} from 'react-bootstrap';
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state ={isModalOpen: false}
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.setImg = this.setImg.bind(this);
  }

  openModal() {
    console.log("opening Modal");
    this.setState({ isModalOpen: true },function () {
      console.log(this.state.isModalOpen, "isModalOpen");
    })
  }

  closeModal() {
    this.setState({isModalOpen:false})
  }

  setImg(url){
    this.setState({
      profilePicUrl: url,
      isModalOpen: false
    });
  }

  componentDidMount() {
    var newProfilePicUrl
    axios.get('/userProfileInfo').then((res) => {
      const {id, username, firstname, lastname, country, city, profilePicUrl} = res.data.results

      if (profilePicUrl === null) {
         newProfilePicUrl = '/static/imgs/profilepic.png';
      } else {
        newProfilePicUrl = profilePicUrl;
      }
      this.setState({ id, username, firstname, lastname, country, city, profilePicUrl: newProfilePicUrl });
    });
  }
  render() {
    console.log("profilePicUrl", this.state.profilePicUrl);
    return (
      <div id="layer-profile">
        <div id="profile-cnt">
          <div id="profile-user-info">
            <Image src={this.state.profilePicUrl} onClick={this.openModal} thumbnail responsive/>
            <p>{this.state.username} </p>
            <p>{this.state.city}, {this.state.country} </p>
            <div id="bio">
            </div>
          </div>
          <WallContainer/>
        </div>
        <ImageModal
          isModalOpen={this.state.isModalOpen}
          closeModal={this.closeModal}
          profilePicUrl={this.state.profilePicUrl}
          setImg={this.setImg}/>
      </div>
    );
  }
}

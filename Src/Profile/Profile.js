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
    this.state ={isModalOpen: false , isBioModalOpen: false}
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.setImg = this.setImg.bind(this);
    this.openBioModal = this.openBioModal.bind(this);
    this.closeBioModal = this.closeBioModal.bind(this);
    this.setBio = this.setBio.bind(this);
  }

  openModal() {
    console.log("opening Modal");
    this.setState({ isModalOpen: true })
  }

  closeModal() {
    this.setState({isModalOpen:false})
  }
  openBioModal(){
    this.setState({ isBioModalOpen: true })
  }
  closeBioModal(){
    this.setState({ isBioModalOpen: false })
  }
  setImg(url){
    this.setState({
      profilePicUrl: url,
      isModalOpen: false
    });
  }

  setBio(newProfileBio){
    this.setState({
      profileBio: newProfileBio,
      isBioModalOpen: false,
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
    axios.get('/userBio').then((res) => {
      let profileBio;
      if (res.data.results.bio == null) {

        profileBio= "Click to Edit your Bio"
      } else {
        profileBio = res.data.results.bio;
      }
      this.setState({
        profileBio: profileBio,
      });
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
            <p onClick={this.openBioModal}>{this.state.profileBio} </p>
            <p>{this.state.city}, {this.state.country} </p>
            <div id="bio">
            </div>
          </div>
          <WallContainer/>
        </div>
        {this.state.isBioModalOpen && <EditBio closeBioModal={this.closeBioModal} setBio={this.setBio}/>}
        <ImageModal
          isModalOpen={this.state.isModalOpen}
          closeModal={this.closeModal}
          profilePicUrl={this.state.profilePicUrl}
          setImg={this.setImg}/>
      </div>
    );
  }
}

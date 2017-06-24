import React from 'react';
import axios from '../axios';
import WallContainer from '../WallFeed/WallContainer';
import ImageModal from './ImageModal';
import EditBio from '../EditBio/EditBio';
import OnlineFriends from '../Friends/OnlineFriends';
import EditUsername from '../EditUsername/EditUsername';
import {Button, Form, Image, FormGroup, ControlLabel, FormControl, Checkbox, Modal} from 'react-bootstrap';
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state ={isModalOpen: false , isBioModalOpen: false, isUsernameModalOpen: false }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.setImg = this.setImg.bind(this);
    this.openBioModal = this.openBioModal.bind(this);
    this.closeBioModal = this.closeBioModal.bind(this);
    this.setBio = this.setBio.bind(this);
    this.openUsernameModal = this.openUsernameModal.bind(this);
    this.closeUsernameModal = this.closeUsernameModal.bind(this);
    this.setUsername = this.setUsername.bind(this);
  }

  openModal() {
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
  openUsernameModal(){
    this.setState({ isUsernameModalOpen: true })
  }
  closeUsernameModal(){
    this.setState({ isUsernameModalOpen: false })
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
  setUsername(newUsername){
    this.setState({
      username: newUsername,
      isUsernameModalOpen: false,
    });
  }

  componentDidMount() {
    var newProfilePicUrl
    axios.get('/userProfileInfo').then((res) => {
      const {id, username, firstname, lastname, country, city, profilePicUrl} = res.data.results

      if (profilePicUrl === null ) {
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
    return (
      <div>
        <div id="profile-cnt">
          <div id="profile-user-info">
            <Image src={this.state.profilePicUrl} onClick={this.openModal} thumbnail responsive/>
            <p onClick={this.openUsernameModal}>{this.state.username} </p>
            <p onClick={this.openBioModal}>{this.state.profileBio} </p>
            <p>{this.state.city}, {this.state.country} </p>
          </div>
          <WallContainer
          commentedId ={this.props.params.id}/>
          <OnlineFriends/>
        </div>
        {this.state.isBioModalOpen && <EditBio closeBioModal={this.closeBioModal} setBio={this.setBio}/>}
        {this.state.isUsernameModalOpen && <EditUsername closeUsernameModal={this.closeUsernameModal} setUsername={this.setUsername}/>}

        <ImageModal
          isModalOpen={this.state.isModalOpen}
          closeModal={this.closeModal}
          profilePicUrl={this.state.profilePicUrl}
          setImg={this.setImg}/>
      </div>
    );
  }
}

import React from 'react';
import axios from '../axios';
import {Button, Form, Image, Modal} from 'react-bootstrap';


export default class ImageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state ={}

    this.handleImgSubmit = this.handleImgSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChangeUpload = this.handleChangeUpload.bind(this);

  }

  closeModal() {
    this.props.closeModal();
  }

  handleChangeUpload(e) {
    this.setState({
      fileToUpload: e.target.files[0]
    });
    var formData = new FormData();
    formData.append('file', e.target.files[0]);
    axios.post('/previewUserProfilePic', formData).then((res)=>{
      this.setState({
        file : res.data.file,
      });
    });
  }
  handleImgSubmit(e){
    var formData = new FormData();
    formData.append('file', this.state.fileToUpload);
    axios.post('/userInsertProfilePic', formData).then((res) => {
      this.props.setImg(res.data.newImagePath);
      this.setState({
        file : res.data.newImagePath
      });
    });
  }

  render(){
   let imagePreviewSource = '';
    if(this.state.file){
      imagePreviewSource = this.state.file;
    } else {
      imagePreviewSource = this.props.profilePicUrl;
    }
    console.log(imagePreviewSource, "imagePreviewSource");
    return (

        <Modal show={this.props.isModalOpen} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title> Upload a Profile Pic </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img id="preview-img" src={imagePreviewSource} thumbnail responsive/>
            <input type="file" name="file" onChange={this.handleChangeUpload}/>
          </Modal.Body>
          <Modal.Footer>
            <Button id="btn-upload" onClick={this.handleImgSubmit}>Upload</Button>
            <Button id="btn-close" onClick={this.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>

    )
  }
}

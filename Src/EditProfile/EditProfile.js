import React from 'react';
import axios from '../axios';
import {Button, Form, Image, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';

export default class EditProfile extends React.Component{
  constructor(props) {
    super(props);
    this.state = {validationState: null}
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    this.handleChangeProfile = this.handleChangeProfile.bind(this);
  }
  handleChangeProfile(e) {
    this.setState({
      [e.target.name] : e.target.value
    });
  }
  handleEditSubmit(e){
    const { name, lastname, country, city, age } = this.state;
    e.preventDefault();
    axios.post('/updateUserProfile',{
       name, lastname, country, city, age
    });
    location.replace('/');
  }
  render() {
    return (
      <div id="edit-form-cnt">
        <Form id="edit-form-cnt" horizontal>
          <FormGroup controlId="formHorizontalFirstnName" validationState={this.state.validationState} >
            <FormControl  type="text"  name="name"  onChange={this.handleChangeProfile} placeholder="First Name" />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="formHorizontalLastName" validationState={this.state.validationState}>
            <FormControl type="text" name="lastname"  onChange={this.handleChangeProfile} placeholder="Last Name" />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="formHorizontalCity" validationState={this.state.validationState}>
            <FormControl type="text" name="city"  onChange={this.handleChangeProfile} placeholder="City" />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="formHorizontalCountry" validationState={this.state.validationState}>
            <FormControl type="text" name="country"  onChange={this.handleChangeProfile} placeholder="Country" />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="formHorizontalAge" validationState={this.state.validationState}>
            <FormControl type="text" name="age"  onChange={this.handleChangeProfile} placeholder="Age" />
            <FormControl.Feedback />
          </FormGroup>
            <div id="errors">
              {this.state.errorFields}
            </div>
          <FormGroup>
            <Button type="submit" onClick= {this.handleEditSubmit}>
              Save Changes
            </Button>
          </FormGroup>
        </Form>
        <div id="cover"></div>
      </div>
    );
  }
}

import React from 'react';
import axios from '../axios';
import {Button, Form, Image, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';

export default class RegisterForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = { validationState: null }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeFields = this.handleChangeFields.bind(this);
  }
  handleChangeFields(e) {
      this.setState({ [e.target.name] : e.target.value });
  }
  handleSubmit(e){
    const { username, name, lastname, country, city, age, email, password} = this.state;
    e.preventDefault();
    console.log(this.state,"this is the state");
    axios.post('/registerNewUser', {
      username, name, lastname, country, city, age, email, password
    })
    .then((res) => {
      var validationState;
      if(!res.data.success){
        validationState = 'error',
        this.setState({
          validationState: validationState,
          errorFields: res.data.notUnique ? 'Email already exists' : 'Complete all the fields to continue'
        });
      } else {
        location.replace('/');
      }
    });
  }
  render() {
    return (
      <div id="form-regis-cnt">
          <Image src="/static/imgs/controller.png" responsive/>
        <Form id="form-new-user-cnt" horizontal>

        <FormGroup controlId="formHorizontalUserName" validationState={this.state.validationState}>
        <FormControl type="text" name="username"  maxlength="250" onChange={this.handleChangeFields} placeholder="User Name" />
        <FormControl.Feedback />
        </FormGroup>
          <FormGroup controlId="formHorizontalFirstnName" validationState={this.state.validationState} >
            <FormControl  type="text"  name="name"  maxlength="250" onChange={this.handleChangeFields} placeholder="First Name" />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="formHorizontalLastName" validationState={this.state.validationState}>
            <FormControl type="text" name="lastname"  maxlength="250" onChange={this.handleChangeFields} placeholder="Last Name" />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="formHorizontalCountry" validationState={this.state.validationState}>
            <FormControl type="text" name="country" maxlength="250" onChange={this.handleChangeFields}  placeholder="Country" />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="formHorizontalCity" validationState={this.state.validationState}>
            <FormControl type="text" name="city" maxlength="250" onChange={this.handleChangeFields} placeholder="City" />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="formHorizontalAge" validationState={this.state.validationState}>
            <FormControl type="age" name="age" maxlength="250" onChange={this.handleChangeFields} placeholder="Age" />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="formHorizontalEmail" validationState={this.state.validationState}>
            <FormControl type="email" name="email" maxlength="250" onChange={this.handleChangeFields} placeholder="Email" />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="formHorizontalPassword" validationState={this.state.validationState}>
            <FormControl type="password" name="password" maxlength="250" onChange={this.handleChangeFields} placeholder="Password" />
            <FormControl.Feedback />
          </FormGroup>
      <div id="errors">
      {this.state.errorFields}
      </div>
          <FormGroup>
            <Button type="submit" onClick={this.handleSubmit} >
            Register
            </Button>
          </FormGroup>
            <p> Alredy a member? <Link to ='/login'>Login</Link></p>
        </Form>
      </div>
    );
  }
}

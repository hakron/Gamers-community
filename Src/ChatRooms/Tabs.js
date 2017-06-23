
import React from 'react';
import axios from '../axios';
import {Button, Form, Image, FormGroup, ControlLabel, FormControl, Modal} from 'react-bootstrap';
import {Router, Route, Link, IndexRoute, hashHistory, browserHistory, IndexLink } from 'react-router';

export default class Tabs extends React.Component{
  constructor(props) {
    super(props);
    this.state ={ selected:0 }

  }
  handleTabsClick(index, e){
    console.log(index);
    this.setState({selected: index});
  }
  renderTitles() {
    function labels(child, index) {
      let activeClass = (this.state.selected === index ? 'active-room' : '');
      return (
        <li className={activeClass} key={index}
        onClick={ ()=> this.handleTabsClick(index)}>
            {child.props.label}
        </li>
      );
    }
    return (
      <ul className="tabs-labels">
        {this.props.children.map(labels.bind(this))}
        </ul>
    );
  }
  renderContent() {
    return (
      <div className="tabs-content">
      {this.props.children[this.state.selected]}
      </div>
    )
  }
  render() {
    return (
      <div className="tabs">
      {this.renderTitles()}
      {this.renderContent()}
      </div>
    );
  }
}

import React from 'react';
import axios from '../axios';
import {Button, Form, Image, FormGroup, ControlLabel, FormControl, Modal} from 'react-bootstrap';
import {Router, Route, Link, IndexRoute, hashHistory, browserHistory, IndexLink } from 'react-router';

export default class SearchBar extends React.Component{
  constructor(props) {
    super(props);
    this.state ={ }
    this.updateSearch = this.updateSearch.bind(this);
    this.renderSearchList = this.renderSearchList.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }
  componentDidMount() {
         axios.get('/getAllUserNames').then((res) => {
             this.setState({ usernames: res.data.usernames });
         })
     }

     updateSearch(e) {
         let usernames = this.state.usernames, searchName = e.target.value;
         if (searchName.length > 0) {
             if (this.state.searchList && this.state.searchList.length == 1) {
                 return;
             } else {
                 let matches = [], idsOfMatches = [];
                 for (var i = 0; i < usernames.length; i++) {
                     if (usernames[i].indexOf(searchName) == 0) {
                         matches.push(usernames[i]);
                         idsOfMatches.push(i + 1);
                     }
                 }
                 axios.post('/getProfileSearchSummaries', idsOfMatches).then((res) => {
                     this.setState({ searchList: res.data.results })
                 }).catch((err) => {
                     console.log(err);
                 })
             }
         } else {
             this.setState({ searchList: false })
         }
     }

     clearSearch(e) {
         this.setState({ searchList: false })
     }

     renderSearchList() {
         let searchList = "";
         if (this.state.searchList) {
             return this.state.searchList.map((list) => {
                 return (
                    <SearchList list = { list }/>
                 );
             });
         }
         return (
             <div id="search-bar-wrapper">
                 <input id="search-bar" placeholder="Search for Gamers" type="text" value={this.state.search} onClick={this.clearSearch} onChange={this.updateSearch}/>
                 <ul id="all-results">
                     {this.renderComments()}
                 </ul>
             </div>
         )
     }
}

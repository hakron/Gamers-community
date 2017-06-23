import React from 'react';
import axios from '../axios';
import OnlineFriend from './OnlineFriend';
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';

export default class OnlineFriends extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      onlineUsersInfo: [],
      msg: "no friends online",
      isChatOpen: false
    }

    this.renderOnlineFriends = this.renderOnlineFriends.bind(this);
    this.openChatModal = this.openChatModal.bind(this);
    this.closeChatModal = this.closeChatModal.bind(this);
}
openChatModal() {
  this.setState({ isChatOpen: true })
}

closeChatModal() {
  this.setState({isChatOpen:false})
}
componentDidMount() {
  axios.get('/onlineFriends').then((results) => {
    this.setState({
      onlineUsersInfo: results.data.onlineUsersInfo,
     })
  });
}

renderOnlineFriends(){
  if(this.state.onlineUsersInfo){
    return this.state.onlineUsersInfo.map((onlineFriend)=> {
      return (
        <OnlineFriend onlineFriend = {onlineFriend}/>
      )
    });
  } else {
    console.log("this.state.onlineUsersInfo is empty");
  }

}
render() {
  return (
    <div id="online-friends-cnt">
      <p id="gamers-online"> Gamers Online </p>
      <div id="single-online-friend"> {this.renderOnlineFriends()} </div>
    </div>
  );
}
}

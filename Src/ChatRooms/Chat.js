import React from 'react';
import ChatMessage from './ChatMessage'
import ChatRooms from './ChatRooms';
import {Link, browserHistory} from 'react-router';
import {Button} from 'react-bootstrap';
import axios from 'axios';
import * as io from 'socket.io-client';
const socket = io.connect();

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessages: [],
      currentLoggedInUser: {}
    };
    this.renderChat = this.renderChat.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount(){
    console.log(this.props.chatRoomName);
    axios.get('/userProfileInfo').then((res) =>{
      this.setState({ currentLoggedInUser: res.data.results });
    })
  }
  componentDidMount() {
    axios.get('/chatMessages').then((res) => {
      this.setState({chatMessages: res.data.chatMessages});
      socket.on('updateChat', (chatMessages) => {
        this.setState({chatMessages});
      });
    });
  }
  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const messageData = {
      AuthorId: this.state.currentLoggedInUser.id,
      username: this.state.currentLoggedInUser.username,
      profilePicUrl: this.state.currentLoggedInUser.profilePicUrl,
      country: this.state.currentLoggedInUser.country,
      city: this.state.currentLoggedInUser.city,
      date: new Date().toLocaleString(),
      message: this.state.message
    };
    socket.emit('chat', messageData);
    this.setState({
      message: ''
    });
  }

  renderChat() {
    let chatMessages;
    return this.state.chatMessages.map((chatMessage) => {
      return (
        <ChatMessage currentLoggedInUser={this.state.currentLoggedInUser} chatMessage = {chatMessage}/>
      )
    });
  }
  render() {
    return (
      <h1> {this.props.chatRoomName}</h1>
    );
    // return (
    //   <div>
    //     <ChatRooms/>
    //     <div id='chat-wrapper'>
    //       {this.renderChat()}
    //       <div id="chat-post">
    //         <textarea id='chat-input' name='message' placeholder="Write a comment ......" value={this.state.message} onChange={this.handleChange} />
    //         <Button value='Post' id='chat-post' onClick={this.handleSubmit}> Post! </Button>
    //       </div>
    //     </div>
    //     <div id="cover-chat"></div>
    //   </div>
    // );
  }
}

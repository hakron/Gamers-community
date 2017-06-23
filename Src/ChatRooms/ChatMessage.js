import React from 'react';
import {Image} from 'react-bootstrap';
export default function ChatMessage(props) {

    return (
      <div id='chat-message-wrapper'>
        <div id="author-data">
          <img src={props.chatMessage.profilePicUrl} />
          <p>{props.chatMessage.username}</p>
          <p>{props.chatMessage.city} {props.chatMessage.country}</p>
          <p>{props.chatMessage.date}</p>
        </div>
        <div id='chat-message'>
          <p>{props.chatMessage.message}</p>
        </div>
      </div>
    );

}

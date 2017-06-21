import React from 'react';
import {Image} from 'react-bootstrap';
export default function FriendRequest(props) {

    return (
      <div id="single-friend-request">
        <div id="userData">
          <Image src={props.friendRequest.imgurl} responsive/>
          <p>{props.friendRequest.firstname} {props.friendRequest.lastname} </p>
        </div>
      </div>
    );

}

import React from 'react';
import {Image} from 'react-bootstrap';
export default function OnlineFriend(props) {

    return (
      <div id="user-online-data">
        <Image src={props.onlineFriend.imgurl} responsive/>
        <p>{props.onlineFriend.firstname} {props.onlineFriend.lastname} </p>
      </div>
    );

}

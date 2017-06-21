import React from 'react';
import {Image} from 'react-bootstrap';
export default function Friend(props) {

    return (
      <div id="single-friend">
        <div id="userData">
          <Image src={props.friend.imgurl} responsive/>
          <p>{props.friend.firstname} {props.friend.lastname} </p>
        </div>
      </div>
    );

}

import React from 'react';
import {Image} from 'react-bootstrap';
import {Link, browserHistory} from 'react-router';
export default function Friend(props) {

    return (
      <div id="single-friend">
        <div id="userData">
          <Link to={`/user/${props.friend.id}`}><Image src={props.friend.imgurl} responsive/></Link>
          <p>{props.friend.username} </p>
          <p>{props.friend.city} {props.friend.country}</p>
        </div>
      </div>
    );

}

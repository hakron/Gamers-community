import React from 'react';
import {Image} from 'react-bootstrap';
import {Link, browserHistory} from 'react-router';

export default function OnlineFriend(props) {

    return (
      <div id="user-online-data">
        <Link to={`/user/${props.onlineFriend.id}`}><Image src={props.onlineFriend.imgurl} responsive/></Link>
        <p>{props.onlineFriend.username} </p>
      </div>
    );

}

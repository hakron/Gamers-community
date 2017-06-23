import React from 'react';
import {Image} from 'react-bootstrap';
import {Link, browserHistory} from 'react-router';
export default function Comment(props) {

    return (
      <div id="single-comment">
        <div id="user-info-data">
          <Link to={`/user/${props.comment.id}`}><Image src={props.comment.imgurl} thumbnail responsive/></Link>
          <p>{props.comment.username} </p>
          <p>{props.comment.bio}</p>
          <p>{props.comment.city} {props.comment.country}</p>
          <p>{props.comment.created_at}</p>
        </div>
        <div id="comment">
          <p> {props.comment.comments} </p>
        </div>
      </div>
    );

}

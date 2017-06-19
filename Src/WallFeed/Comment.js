import React from 'react';
import {Image} from 'react-bootstrap';
export default function Comment(props) {

    return (
      <div id="single-comment">
      <div id="user-info-data">
      <Image src={props.comment.imgurl} responsive/>
      <p>{props.comment.username} </p>
      </div>
      <div id="comment">
      <p> {props.comment.comments} </p>
      </div>
      </div>
    );

}

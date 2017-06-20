import React from 'react';
import {Image} from 'react-bootstrap';
export default function Stream(props) {
  console.log(props);
    return (
      <div id="single-stream">
        <div id="stream-info-data">
          <Image src={props.stream.channel.logo} responsive/>
          <p>{props.stream.channel.display_name} </p>
          <p>{props.stream.channel.status} </p>
          <p>{props.stream.viewers} viewers </p>
          <p>{props.stream.channel.game}</p>
        </div>
        <div id="stream">
        <iframe
            src={`http://player.twitch.tv/?channel=${props.stream.channel.display_name}`}
            height="300"
            width="300"
            frameborder="0"
            scrolling="0"
            allowfullscreen="true">
        </iframe>
        </div>
      </div>
    );

}

import React from 'react';
import {Image} from 'react-bootstrap';
import {Link} from 'react-router';
export default function SearchList(props) {
  return (
    <li className="search-result">
        <Link to=><img src={list.imgurl}/></Link>
        <p> {list.username}</p>
    </li>

  );

  }

import React from 'react';
import WallForm from './WallForm';
import WallUpdates from './WallUpdates';
import axios from '../axios';
export default class WallContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state ={ comments: [] }
    this.setComment = this.setComment.bind(this);
  }
  setComment(comment) {
    axios.post(`/insertComment/${ this.props.commentedId || null}`,{ comment })
    .then((res) => {
      this.setState({ comments: res.data.comments });
    });
  }
  componentDidMount(){
    if(this.state.comments.length == 0) {
      axios.get(`/getUserComment/${this.props.commentedId}/comments`)
      .then((results) => {
        this.setState({ comments: results.data.comments })
      })
      .catch(function (err) {
        console.log("there was an err in WallContainer componentDidMount", err);
      });
    } else {
      this.setState({ comments: this.props.comments});
    }
  }
  render() {
    return (

      <div id="wall-cnt">
        <WallForm commentedId ={this.props.commentedId} setComment={this.setComment}/>
        <WallUpdates comments={this.state.comments} commentedId ={this.props.commentedId}/>
      </div>
    );
  }
}

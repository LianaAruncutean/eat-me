import React from "react";
import "./Comments.css";

function Comment(props) {
  return (
    <div className="comment">
      <div className="userName">{`${props.comment.firstName} ${props.comment.lastName}`}</div>
      <div className="text">{props.comment.comment}</div>
    </div>
  );
}

export default Comment;

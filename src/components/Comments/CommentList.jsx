import React from "react";
import { addComment } from "../../api/blogAPI";
import { isNullOrUndefined } from "../../utils/utils";
import Comment from "./Comment";
import "./Comments.css";

function CommentList(props) {
  const [newComment, setNewComment] = React.useState("");
  const userId = localStorage.getItem("userId");
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const [comments, setComments] = React.useState(props.comments);
  const commentComponents = comments.map((comment) => (
    <Comment key={comment.commentId} comment={comment} />
  ));

  return (
    <div className="commentList">
      {commentComponents}
      <div className="addComment">
        <input
          className="addCommentInput"
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => {
            setNewComment(e.target.value);
          }}
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !isNullOrUndefined(newComment) &&
              newComment !== ""
            ) {
              const addNewComment = async () => {
                const response = await addComment(
                  userId,
                  props.blogId,
                  newComment
                );
                const jsonResponse = await response.json();
                setNewComment("");

                const comm = {
                  commentId: jsonResponse[0].commentId,
                  firstName,
                  lastName,
                  comment: newComment,
                };
                setComments([...comments, comm]);
              };

              addNewComment();
            }
          }}
        />
      </div>
    </div>
  );
}

export default CommentList;

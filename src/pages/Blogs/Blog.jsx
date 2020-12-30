import React from "react";
import "./Blogs.css";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CommentOutlinedIcon from "@material-ui/icons/CommentOutlined";
import { editLikes } from "../../api/blogAPI";
import CommentList from "../../components/Comments/CommentList";

function Blog(props) {
  const [likesCount, setLikesCount] = React.useState(props.blog.likes);
  const [isLiked, setIsLiked] = React.useState(props.blog.isLiked);
  const [isCommentSectionOpen, setIsCommentSectionOpen] = React.useState(false);
  const likeIcon = isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />;
  const userId = localStorage.getItem("userId");

  return (
    <div className="blog">
      <div className="blogContent">
        <img src={props.blog.imageURL} alt="Blog" className="image" />
        <div className="content">
          <div className="header">{props.blog.title}</div>
          <div className="body">{props.blog.text}</div>
          <div className="footer">
            <div className="nrOfLikes">{`${likesCount} likes`}</div>
            <div className="likeButton">
              <div
                className="likeIcon"
                onClick={(e) => {
                  e.preventDefault();
                  const likes = isLiked ? likesCount - 1 : likesCount + 1;
                  setLikesCount(likes);
                  setIsLiked(!isLiked);

                  const editBlogLikes = async () => {
                    await editLikes(userId, props.blog.blogId, likes);
                  };
                  editBlogLikes();
                }}
              >
                {likeIcon}
              </div>
            </div>
            <div className="commentDiv">
              <div className="commentText">
                {props.blog.comments.length} comments
              </div>
              <div
                className="commentIcon"
                onClick={(e) => {
                  setIsCommentSectionOpen(!isCommentSectionOpen);
                }}
              >
                <CommentOutlinedIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="commentSection"
        style={{
          opacity: isCommentSectionOpen ? "1" : "0",
          height: isCommentSectionOpen ? "auto" : "0",
        }}
      >
        <CommentList
          comments={props.blog.comments}
          blogId={props.blog.blogId}
        />
      </div>
    </div>
  );
}

export default Blog;

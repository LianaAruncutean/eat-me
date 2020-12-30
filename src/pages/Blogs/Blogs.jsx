import React from "react";
import { getBlogs } from "../../api/blogAPI";
import Blog from "./Blog";
import "./Blogs.css";
import { useHistory } from "react-router-dom";
import { isNullOrUndefined } from "../../utils/utils";
import { Link } from "react-router-dom";

function Blogs() {
  const [allBlogs, setAllBlogs] = React.useState([]);
  const userId = localStorage.getItem("userId");
  const history = useHistory();

  React.useEffect(() => {
    const getAllBlogs = async () => {
      const allBlogs = await getBlogs(userId);
      setAllBlogs(allBlogs);
    };
    getAllBlogs();
  }, []);

  if (isNullOrUndefined(userId)) {
    history.push("/login");
    return null;
  }

  const blogs = allBlogs.map((blog) => <Blog key={blog.blogId} blog={blog} />);
  return (
    <div className="blogs">
      <div className="blogsHeader">Advice</div>
      <div className="blogsButtons">
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <div className="dashboardButton">Dashboard</div>
        </Link>
        <Link to="/retrospective" style={{ textDecoration: "none", color: "black" }}>
          <div className="menusButton">Retrospective</div>
        </Link>
      </div>
      <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
        <div
          className="logoutButton"
          onClick={() => {
            localStorage.clear();
          }}
        >
          Logout
        </div>
      </Link>
      <div className="blogsContent">{blogs}</div>
    </div>
  );
}

export default Blogs;

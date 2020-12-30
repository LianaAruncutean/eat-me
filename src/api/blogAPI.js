const URL = "http://localhost:51607/api/Blog/";

export const getBlogs = async (userId) => {
  const response = await fetch(`${URL}GetBlogs/${userId}`);
  const json = await response.json();

  return json;
};

export const editLikes = async (userId, blogId, nrOfLikes) => {
  const blog = {
    BlogId: blogId,
    UserId: Number(userId),
    NrOfLikes: nrOfLikes,
  };
  const response = await fetch(`${URL}EditLikes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blog),
  });

  return response;
};

export const addComment = async (userId, blogId, comment) => {
  const addComment = {
    CommentId: 0,
    BlogId: blogId,
    UserId: Number(userId),
    Comment: comment,
  };
  const response = await fetch(`${URL}AddComment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(addComment),
  });

  return response;
};

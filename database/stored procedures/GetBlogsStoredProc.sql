IF OBJECT_ID('[GetBlogsStoredProc]') IS NOT NULL
  DROP PROCEDURE [GetBlogsStoredProc]
GO


CREATE PROCEDURE [GetBlogsStoredProc] @USER_ID as int
AS
BEGIN
	SELECT b.BlogId
		, b.Title
		, b.Text
		, b.Likes
		, b.ImageURL
		, (CASE 
			WHEN EXISTS(SELECT * FROM UserBlog AS ub WHERE ub.BlogId = b.BlogId AND ub.UserId = @USER_ID) THEN CAST(1 AS BIT)
				ELSE CAST(0 AS BIT)
			END) AS IsLiked
		, bc.CommentId
		, bc.Comment
		, u.FirstName
		, u.LastName
		FROM Blog AS b
		LEFT JOIN BlogComment as bc ON bc.BlogId = b.BlogId
		LEFT JOIN [User] as u ON u.Id = bc.UserId
END
GO
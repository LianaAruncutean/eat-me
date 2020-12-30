IF OBJECT_ID('[AddCommentStoredProc]') IS NOT NULL
  DROP PROCEDURE [AddCommentStoredProc]
GO


CREATE PROCEDURE [AddCommentStoredProc] @USER_ID AS INT
  , @BLOG_ID AS INT
  , @COMMENT AS NVARCHAR(255)
AS
BEGIN
  
  INSERT INTO BlogComment (
	 BlogId
	, UserId
	, Comment
  )
  VALUES (
	@BLOG_ID
	, @USER_ID
	, @COMMENT
  )

  SELECT CAST(SCOPE_IDENTITY() AS int) AS CommentId
	, @USER_ID AS UserId
	, @BLOG_ID AS BlogId
	, @COMMENT AS Comment
END
GO
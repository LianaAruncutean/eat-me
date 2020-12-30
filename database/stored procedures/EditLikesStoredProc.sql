IF OBJECT_ID('[EditLikesStoredProc]') IS NOT NULL
  DROP PROCEDURE [EditLikesStoredProc]
GO


CREATE PROCEDURE [EditLikesStoredProc] @BLOG_ID AS INT
  , @USER_ID AS INT
  , @NR_OF_LIKES AS INT
AS
BEGIN
  
  UPDATE Blog
  SET Likes = @NR_OF_LIKES
  WHERE BlogId = @BLOG_ID

  IF EXISTS(SELECT * FROM UserBlog WHERE BlogId = @BLOG_ID AND UserId = @USER_ID)
	  BEGIN
		DELETE FROM UserBlog 
		WHERE BlogId = @BLOG_ID AND UserId = @USER_ID 
	  END
  ELSE
	  BEGIN
		INSERT INTO UserBlog (
			UserId,
			BlogId
		)
		VALUES (
			@USER_ID,
			@BLOG_ID
		)
	  END

  SELECT @BLOG_ID AS BlogId
	, @USER_ID AS UserId
	, @NR_OF_LIKES AS NrOfLikes
END
GO
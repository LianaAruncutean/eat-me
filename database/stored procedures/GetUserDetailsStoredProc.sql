IF OBJECT_ID('[GetUserDetailsStoredProc]') IS NOT NULL
  DROP PROCEDURE [GetUserDetailsStoredProc]
GO


CREATE PROCEDURE [GetUserDetailsStoredProc] @EMAIL as NVARCHAR(100),
	@PASSWORD as NVARCHAR(100)
AS
BEGIN
	SELECT uc.UserId
		, u.FirstName
		, u.LastName
		, u.Calories
		, u.IsAdmin
		FROM UserCredentials AS uc
		INNER JOIN [User] as u ON u.Id = uc.UserId
		WHERE uc.Email = @EMAIL AND uc.Password = @PASSWORD
END
GO
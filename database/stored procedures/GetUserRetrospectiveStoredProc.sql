IF OBJECT_ID('[GetUserRetrospectiveStoredProc]') IS NOT NULL
  DROP PROCEDURE [GetUserRetrospectiveStoredProc]
GO


CREATE PROCEDURE [GetUserRetrospectiveStoredProc] @USER_ID as int
AS
BEGIN

	SET DATEFIRST 1

	  SELECT f.Id as FoodId
		, Name
		, f.Calories*uf.Quantity as Calories
		, Day
		, DATENAME(WEEKDAY, Day) AS DayOfWeek
	  FROM Food as f
	  INNER JOIN UserFood as uf 
		ON uf.FoodId = f.Id
	  INNER JOIN [User] as u
		ON uf.UserId = u.Id and u.Id = @USER_ID
	  WHERE Day > = CAST(DATEADD(DAY,1-DATEPART(dw, GETDATE()), GETDATE()) AS DATE)
		AND Day < GETDATE() - 1
	  ORDER BY Day
END
GO
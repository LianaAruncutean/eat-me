IF OBJECT_ID('[GetUserFoodStoredProc]') IS NOT NULL
  DROP PROCEDURE [GetUserFoodStoredProc]
GO


CREATE PROCEDURE [GetUserFoodStoredProc] @USER_ID as int
AS
BEGIN
  SELECT f.Id as FoodId
		,Name
		,f.Calories*uf.Quantity as Calories
  from Food as f
  INNER JOIN UserFood as uf 
  on uf.FoodId = f.Id
  INNER JOIN [User] as u
  on uf.UserId = u.Id and u.Id = @USER_ID
  where uf.Day = cast(GETDATE() as date)
END
GO
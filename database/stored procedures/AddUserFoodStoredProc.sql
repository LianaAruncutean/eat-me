IF OBJECT_ID('[AddUserFoodStoredProc]') IS NOT NULL
  DROP PROCEDURE [AddUserFoodStoredProc]
GO


CREATE PROCEDURE [AddUserFoodStoredProc] @USER_ID AS INT
  , @FOOD_ID AS INT
  , @QUANTITY AS DECIMAL(6,3)
AS
BEGIN
  
  INSERT INTO UserFood (
	UserId
	, FoodId
	, Quantity
	, Day
  )
  VALUES (
	@USER_ID
	, @FOOD_ID
	, @QUANTITY/100
	, GETDATE()
  )

END
GO
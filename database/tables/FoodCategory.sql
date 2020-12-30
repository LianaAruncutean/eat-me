CREATE TABLE [FoodCategory](
	FoodCategoryId int NOT NULL IDENTITY(1, 1)
	, Name [nvarchar](100) NOT NULL
) ON [PRIMARY]
GO

ALTER TABLE [FoodCategory] ADD CONSTRAINT [PK_FoodCategory] PRIMARY KEY CLUSTERED ([FoodCategoryId]) ON [PRIMARY]
GO
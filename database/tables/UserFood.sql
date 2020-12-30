CREATE TABLE [UserFood](
	UserId int NOT NULL
	,FoodId int NOT NULL
	,Quantity decimal(6,3) NOT NULL
	,Day date NOT NULL
) ON [PRIMARY]
GO

CREATE NONCLUSTERED INDEX [FK_UserFood_Food] ON [UserFood] ([FoodId]) ON [PRIMARY]
GO

CREATE NONCLUSTERED INDEX [FK_UserFood_User] ON [UserFood] ([UserId]) ON [PRIMARY]
GO

ALTER TABLE [UserFood] ADD CONSTRAINT [FK_UserFood_Food] FOREIGN KEY ([FoodId]) REFERENCES [Food] ([Id])
GO

ALTER TABLE [UserFood] ADD CONSTRAINT [FK_UserFood_User] FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO
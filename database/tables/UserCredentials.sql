CREATE TABLE [UserCredentials](
	UserId int NOT NULL
	, Email [nvarchar](100) NOT NULL
	, Password [nvarchar](100) NOT NULL
) ON [PRIMARY]
GO

CREATE NONCLUSTERED INDEX [FK_UserCredentials] ON [UserCredentials] ([UserId]) ON [PRIMARY]
GO

ALTER TABLE [UserCredentials] ADD CONSTRAINT [FK_UserCredentials] FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO
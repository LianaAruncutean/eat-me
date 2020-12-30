CREATE TABLE [BlogComment](
	CommentId int NOT NULL IDENTITY(1, 1)
	, BlogId int NOT NULL
	, UserId int NOT NULL
	, Comment [nvarchar](255) NOT NULL
) ON [PRIMARY]
GO

ALTER TABLE [BlogComment] ADD CONSTRAINT [PK_Comment] PRIMARY KEY CLUSTERED ([CommentId]) ON [PRIMARY]
GO

CREATE NONCLUSTERED INDEX [FK_BlogComment_Blog] ON [BlogComment] ([BlogId]) ON [PRIMARY]
GO

CREATE NONCLUSTERED INDEX [FK_BlogComment_User] ON [BlogComment] ([UserId]) ON [PRIMARY]
GO

ALTER TABLE [BlogComment] ADD CONSTRAINT [FK_BlogComment_Blog] FOREIGN KEY ([BlogId]) REFERENCES [Blog] ([BlogId])
GO

ALTER TABLE [BlogComment] ADD CONSTRAINT [FK_BlogComment_User] FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

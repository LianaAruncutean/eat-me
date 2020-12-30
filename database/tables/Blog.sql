CREATE TABLE [Blog](
	BlogId int NOT NULL IDENTITY(1, 1)
	, Title [nvarchar](100) NOT NULL
	, Text [nvarchar](255) NOT NULL
	, Likes int NOT NULL
	, ImageURL [nvarchar](255) NULL
) ON [PRIMARY]
GO

ALTER TABLE [Blog] ADD CONSTRAINT [PK_Blog] PRIMARY KEY CLUSTERED ([BlogId]) ON [PRIMARY]
GO
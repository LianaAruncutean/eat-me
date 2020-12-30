using System;
using System.Collections.Generic;
using System.Linq;
using Eat_Me.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Eat_Me.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly AppDbContext _context;
        public BlogController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("[action]/{userId}")]
        public IEnumerable<Blog> GetBlogs(int userId)
        {
            var storedProcName = "GetBlogsStoredProc ";

            var result = _context.Blog.FromSqlRaw(storedProcName + "{0}", userId);

            return result.AsEnumerable().GroupBy(blog => blog.BlogId)
                .Select(group =>
                {
                    var blogEntity = group.FirstOrDefault();
                    return new Blog()
                    {
                        BlogId = blogEntity.BlogId,
                        Title = blogEntity.Title,
                        Text = blogEntity.Text,
                        Likes = blogEntity.Likes,
                        ImageURL = blogEntity.ImageURL,
                        IsLiked = blogEntity.IsLiked,
                        Comments = group.Where(comment => comment.CommentId != null).Any() ? group.GroupBy(c => c.CommentId).Select(entity =>
                        {
                            var comment = entity.FirstOrDefault();
                            return new BlogComment()
                            {
                                CommentId = comment.CommentId.Value,
                                Comment = comment.Comment,
                                FirstName = comment.FirstName,
                                LastName = comment.LastName
                            };
                        }).ToList() : new List<BlogComment>()
                    };
                });
        }


        [HttpPost]
        [Route("[action]")]
        public ActionResult EditLikes(EditLikes editLikes)
        {
            var storedProcName = "EditLikesStoredProc ";

            var result = _context.EditLikes.FromSqlRaw(storedProcName + "{0}, {1}, {2}", editLikes.BlogId, editLikes.UserId, editLikes.NrOfLikes);

            return Ok(result);
        }


        [HttpPost]
        [Route("[action]")]
        public ActionResult AddComment(AddComment addComment)
        {
            var storedProcName = "AddCommentStoredProc ";

            var result = _context.AddComment.FromSqlRaw(storedProcName + "{0}, {1}, {2}", addComment.UserId, addComment.BlogId, addComment.Comment).AsEnumerable().Distinct();

            return Ok(result);
        }
    }
}

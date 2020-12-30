using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Eat_Me.Models
{
    [Table("GetBlogsStoredProc")]
    public class BlogEntity
    {
        public int BlogId { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public int Likes { get; set; }
        public string ImageURL { get; set; }
        public bool IsLiked { get; set; }
        public int? CommentId { get; set; }
        public string Comment { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eat_Me.Models
{
    public class Blog
    {
        public int BlogId { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public int Likes { get; set; }
        public string ImageURL { get; set; }
        public bool IsLiked { get; set; }
        public List<BlogComment> Comments { get; set; }
    }
}

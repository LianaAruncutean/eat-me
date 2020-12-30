using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eat_Me.Models
{
    public class BlogComment
    {
        public int CommentId { get; set; }
        public string Comment { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}

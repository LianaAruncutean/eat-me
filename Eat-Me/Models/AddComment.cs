using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Eat_Me.Models
{
    [Table("AddCommentStoredProc")]
    public class AddComment
    {
        public int CommentId { get; set; }
        public int UserId { get; set; }
        public int BlogId { get; set; }
        public string Comment { get; set; }
    }
}

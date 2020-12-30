using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Eat_Me.Models
{
    [Table("EditLikesStoredProc")]
    public class EditLikes
    {
        public int BlogId { get; set; }
        public int UserId { get; set; }
        public int NrOfLikes { get; set; }
    }
}

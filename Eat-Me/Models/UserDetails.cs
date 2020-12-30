using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Eat_Me.Models
{
    [Table("GetUserDetailsStoredProc")]
    public class UserDetails
    {
        public int? UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int? Calories { get; set; }
        public bool? IsAdmin { get; set; }
    }
}

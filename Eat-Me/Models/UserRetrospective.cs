using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Eat_Me.Models
{
    [Table("GetUserRetrospectiveStoredProc")]
    public class UserRetrospective
    {
        public int FoodId { get; set; }
        public string Name { get; set; }
        public decimal Calories { get; set; }
        public DateTime Day { get; set; }
        public string DayOfWeek { get; set; }
    }
}

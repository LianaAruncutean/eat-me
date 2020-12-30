using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Eat_Me.Models
{
    [Table("GetUserFoodStoredProc")]
    public class UserFood
    {
        public int FoodId { get; set; }
        public string Name { get; set; }
        public decimal Calories { get; set; }
    }
}

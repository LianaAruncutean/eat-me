using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Eat_Me.Models
{
    [Table("AddUserFoodStoredProc")]
    public class AddUserFood
    {
        public int UserId { get; set; }
        public int FoodId { get; set; }
        public decimal Quantity { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Eat_Me.Models
{
    [Table("DeleteFoodStoredProc")]
    public class DeleteFood
    {
        public string FoodName { get; set; }
    }
}

using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Eat_Me.Models
{
    [Table("AddFoodStoredProc")]
    public class AddFood
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Calories { get; set; }
        public string ImageURL { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eat_Me.Models
{
    public class Food
    {
        public int Id { get; set; }
        public string Name { get; set; }
        //public List<Category> Category { get; set; }
        public int Calories { get; set; }
        public string ImageURL { get; set; }
    }
}

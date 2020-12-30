using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eat_Me.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Eat_Me.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodController : ControllerBase
    {
        private readonly AppDbContext _context;
        public FoodController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("[action]")]
        public IEnumerable<Food> GetAllFoods()
        {
            return _context.Food;
        }

        [HttpPost]
        [Route("[action]")]
        public ActionResult AddFood(AddFood addFoood)     
        {
            var storedProcName = "AddFoodStoredProc ";

            var result = _context.AddFood.FromSqlRaw(storedProcName + "{0}, {1}, {2}", addFoood.Name, addFoood.Calories, addFoood.ImageURL);
            return Ok(result);
        }

        [HttpPost]
        [Route("[action]")]
        public ActionResult DeleteFood(DeleteFood deleteFood)
        {
            var storedProcName = "DeleteFoodStoredProc ";

            var result = _context.DeleteFood.FromSqlRaw(storedProcName + "{0}", deleteFood.FoodName);

            return Ok(result);
        }
    }
}

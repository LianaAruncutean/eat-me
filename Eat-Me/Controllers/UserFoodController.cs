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
    public class UserFoodController : ControllerBase
    {
        private readonly AppDbContext _context;
        public UserFoodController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("[action]/{userId}")]
        public IEnumerable<UserFood> GetUserFoods(int userId)
        {
            var storedProcName = "GetUserFoodStoredProc ";
            return _context.UserFood.FromSqlRaw(storedProcName + "{0}", userId);
        }


        [HttpPost]
        [Route("[action]")]
        public ActionResult<int> AddUserFood(AddUserFood addUserFoood)
        {
            var storedProcName = "AddUserFoodStoredProc ";

            var result = _context.AddUserFood.FromSqlRaw(storedProcName + "{0}, {1}, {2}", addUserFoood.UserId, addUserFoood.FoodId, addUserFoood.Quantity).ToList()[0];
            return Ok(result);
        }
    }
}

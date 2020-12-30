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
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("[action]")]
        public ActionResult Login(Credentials credentials)
        {
            var storedProcName = "GetUserDetailsStoredProc ";

            var result = _context.UserDetails.FromSqlRaw(storedProcName + "{0}, {1}", credentials.Email, credentials.Password);
            
            if (result == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(result);
            }
        }
    }
}

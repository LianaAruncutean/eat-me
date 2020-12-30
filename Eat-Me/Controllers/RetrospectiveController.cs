using System;
using System.Collections.Generic;
using System.Linq;
using Eat_Me.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Eat_Me.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RetrospectiveController : ControllerBase
    {
        private readonly AppDbContext _context;
        public RetrospectiveController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("[action]/{userId}")]
        public IEnumerable<UserRetrospective> GetRetrospective(int userId)
        {
            var storedProcName = "GetUserRetrospectiveStoredProc ";
            var result = _context.UserRetrospective.FromSqlRaw(storedProcName + "{0}", userId);

            return result;
        }

    }
}

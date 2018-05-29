using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading.Tasks;
using Distributed.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using Microsoft.AspNetCore.Authorization;

namespace Distributed.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController
    {
        private readonly GamesContext _context;

        public ValuesController(GamesContext context)
        {
            _context = context;
        }

        // GET api/values
        [Authorize]
        [HttpGet]
        public IEnumerable<string> Get()
        {
            IQueryable<Game> games = _context.Game;
            return new string[] { games.Count().ToString() };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

using System.Linq;
using Distributed.Models;
using Microsoft.AspNetCore.Mvc;
using Distributed.FormModels;
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace Distributed.Controllers
{
    [Route("api/[controller]")]
    public class GamesController : Controller
    {
        private readonly GamesContext _context;

        public GamesController(GamesContext context)
        {
            _context = context;
        }

        // GET api/games
        [HttpGet]
        public IQueryable<Game> Get()
        {
            IQueryable<Game> games = _context.Game
                .Include(m => m.Genre)
                .Include(m => m.Rating);
            return games;
        }

        // GET api/games/1
        [HttpGet]
        [Route("Paginate/{page?}")]
        public GamesPaginatorDto Paginate(int? page, int? ratingId, int? genreId, string name)
        {
            const int PageSize = 8;
            IQueryable<Game> games = _context.Game
                .Include(m => m.Genre)
                .Include(m => m.Rating)
                .Where(m => EF.Functions.Like(m.Name, $"{name}%"));

            if (genreId != null)
            {
                games = games.Where(m => m.GenreId == genreId);
            }

            if (ratingId != null)
            {
                games = games.Where(m => m.RatingId == ratingId);
            }

            PaginatedList<Game> paginated = PaginatedList<Game>.Create(games, page ?? 1, PageSize);
            return new GamesPaginatorDto
            {
                Games = paginated,
                TotalPages = paginated.TotalPages,
                PageIndex = paginated.PageIndex,
            };
        }

        // GET api/games/5
        [HttpGet("{id}")]
        public object Get(int id)
        {
            Game game = _context.Game
                .Include(m => m.Genre)
                .Include(m => m.Rating)
                .SingleOrDefault(m => m.Id == id);

            if (game == null)
            {
                return NotFound();
            }
            return game;
        }

        // POST api/games
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public object Post([FromBody]GamePostDto model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    Game game = model.GetGame();
                    _context.Add(game);
                    _context.SaveChanges();
                    return StatusCode(201, game);
                }
                catch (Exception exception)
                {
                    return BadRequest(new { exception = exception.InnerException.Message });
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        // PUT api/games/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public object Put(int id, [FromBody]GamePostDto model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    Game game = _context.Game.SingleOrDefault(m => m.Id == id);
                    if (game == null)
                    {
                        return NotFound();
                    }
                    model.UpdateGame(game);
                    _context.Update(game);
                    _context.SaveChanges();
                    return StatusCode(200, game);
                }
                catch (Exception exception)
                {
                    return BadRequest(new { exception = exception.InnerException.Message });
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        // DELETE api/games/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public object Delete(int id)
        {
            Game game = _context.Game.SingleOrDefault(m => m.Id == id);
            if (game == null)
            {
                return NotFound();
            }
            try
            {
                _context.Game.Remove(game);
                _context.SaveChanges();
                return StatusCode(204);
            }
            catch (Exception exception)
            {
                return BadRequest(new { exception = exception.InnerException.Message });
            }
        }
    }
}

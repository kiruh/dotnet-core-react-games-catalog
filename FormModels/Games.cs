using System.ComponentModel.DataAnnotations;
using Distributed.Models;

namespace Distributed.FormModels
{
    public class GamePostDto
    {
        [Required]
        [MinLength(1)]
        [MaxLength(200)]
        public string Name { get; set; }
        [Required]
        public string ReleaseYear { get; set; }

        public int? GenreId { get; set; }
        public int? RatingId { get; set; }


        public void UpdateGame(Game model)
        {
            model.Name = Name;
            model.ReleaseYear = ReleaseYear;
            model.GenreId = GenreId;
            model.RatingId = RatingId;
        }

        public Game GetGame()
        {
            return new Game
            {
                Name = Name,
                ReleaseYear = ReleaseYear,
                GenreId = GenreId,
                RatingId = RatingId
            };
        }
    }

    public class GamesPaginatorDto
    {
        public PaginatedList<Game> Games { get; set; }
        public int PageIndex { get; set; }
        public int TotalPages { get; set; }
    }
}
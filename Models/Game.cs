using System.ComponentModel.DataAnnotations;
using Distributed.FormModels;

namespace Distributed.Models
{
    public class Game
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(200)]
        public string Name { get; set; }

        [Required]
        public string ReleaseYear { get; set; }

        public int? GenreId { get; set; }
        public Genre Genre { get; set; }

        public int? RatingId { get; set; }
        public Rating Rating { get; set; }

        public void UpdateFromPostDto(GamePostDto model)
        {
            Name = model.Name;
            ReleaseYear = model.ReleaseYear;
            GenreId = model.GenreId;
            RatingId = model.RatingId;
        }

        public static Game CreateFromPostDto(GamePostDto model)
        {
            return new Game
            {
                Name = model.Name,
                ReleaseYear = model.ReleaseYear,
                GenreId = model.GenreId,
                RatingId = model.RatingId
            };
        }
    }
}
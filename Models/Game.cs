using System.ComponentModel.DataAnnotations;

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

        [Required]
        public string Company { get; set; }
    }
}
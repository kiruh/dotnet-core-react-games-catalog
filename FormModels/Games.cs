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
    }

    public class GamesPaginatorDto
    {
        public PaginatedList<Game> Games { get; set; }
        public int PageIndex { get; set; }
        public int TotalPages { get; set; }
    }
}
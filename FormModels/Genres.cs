using System.ComponentModel.DataAnnotations;
using Distributed.Models;

namespace Distributed.FormModels
{
    public class GenrePostDto
    {
        [Required]
        [MinLength(1)]
        [MaxLength(100)]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        public Genre GetGenre()
        {
            return new Genre
            {
                Name = Name,
                Description = Description
            };
        }

        public void UpdateGenre(Genre model)
        {
            model.Name = Name;
            model.Description = Description;
        }
    }
}
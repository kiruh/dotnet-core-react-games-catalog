using System.ComponentModel.DataAnnotations;
using Distributed.FormModels;

namespace Distributed.Models
{
    public class Genre
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(100)]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        public static Genre CreateFromPostDto(GenrePostDto model)
        {
            return new Genre
            {
                Name = model.Name,
                Description = model.Description
            };
        }

        public void UpdateFromPostDto(GenrePostDto model)
        {
            Name = model.Name;
            Description = model.Description;
        }
    }
}
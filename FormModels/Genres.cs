using System.ComponentModel.DataAnnotations;

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
    }
}
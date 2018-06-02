using System.ComponentModel.DataAnnotations;

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
    }
}
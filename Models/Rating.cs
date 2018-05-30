using System.ComponentModel.DataAnnotations;
using Distributed.FormModels;

namespace Distributed.Models
{
    public class Rating
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(100)]
        public string Value { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(400)]
        public string Description { get; set; }

        public static Rating CreateFromPostDto(RatingPostDto model)
        {
            return new Rating
            {
                Value = model.Value,
                Description = model.Description
            };
        }

        public void UpdateFromPostDto(RatingPostDto model)
        {
            Value = model.Value;
            Description = model.Description;
        }
    }
}
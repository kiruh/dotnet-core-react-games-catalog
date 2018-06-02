using System.ComponentModel.DataAnnotations;
using Distributed.Models;

namespace Distributed.FormModels
{
    public class RatingPostDto
    {
        [Required]
        [MinLength(1)]
        [MaxLength(100)]
        public string Value { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(400)]
        public string Description { get; set; }

        public Rating GetRating()
        {
            return new Rating
            {
                Value = Value,
                Description = Description
            };
        }

        public void UpdateRating(Rating model)
        {
            model.Value = Value;
            model.Description = Description;
        }
    }
}
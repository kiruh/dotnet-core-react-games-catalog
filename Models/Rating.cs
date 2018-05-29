using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
    }
}
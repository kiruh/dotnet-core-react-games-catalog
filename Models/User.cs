using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace Distributed.Models
{
    public class User : IdentityUser
    {
        [Required]
        [MinLength(1)]
        [Display(Name = "First Name")]
        public string FirstName { get; set; }

        [Required]
        [MinLength(1)]
        [Display(Name = "Last Name")]
        public string LastName { get; set; }

        public string FullName
        {
            get
            {
                return FirstName + " " + LastName;
            }
        }
    }
}
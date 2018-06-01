using System.ComponentModel.DataAnnotations;
using Distributed.Models;

namespace Distributed.FormModels
{
    public class LoginDto
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }

    public class RegisterDto
    {
        [Required]
        [MinLength(1)]
        public string FirstName { get; set; }

        [Required]
        [MinLength(1)]
        public string LastName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "PASSWORD_MIN_LENGTH", MinimumLength = 6)]
        public string Password { get; set; }
    }

    public class TokenDto
    {
        [Required]
        public string Token { get; set; }
    }

    public class UserDto
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public bool IsAdmin { get; set; }

        public static UserDto GetFromApplicationUser(ApplicationUser user)
        {
            return new UserDto
            {
                FullName = user.FullName,
                Email = user.Email,
            };
        }
    }
}
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Distributed.Models
{
    public class SeedData
    {
        private static void InitializeGenres(GamesContext context)
        {
            context.Genre.AddRange(
                new Genre
                {
                    Id = 1,
                    Name = "Action",
                    Description = "Action Description",
                },
                new Genre
                {
                    Id = 2,
                    Name = "Adventure",
                    Description = "Adventure Description",
                },
                new Genre
                {
                    Id = 3,
                    Name = "RPG",
                    Description = "RPG Description",
                },
                new Genre
                {
                    Id = 4,
                    Name = "Startegy",
                    Description = "Startegy Description",
                },
                new Genre
                {
                    Id = 5,
                    Name = "Simulation",
                    Description = "Simulation Description",
                },
                new Genre
                {
                    Id = 6,
                    Name = "Sports",
                    Description = "Sports Description",
                },
                new Genre
                {
                    Id = 7,
                    Name = "Shooter",
                    Description = "Shooter Description",
                }
            );
            context.SaveChanges();
        }

        private static void InitializeRatings(GamesContext context)
        {
            context.Rating.AddRange(
                new Rating
                {
                    Id = 1,
                    Value = "One point",
                    Description = "One :((",
                },
                new Rating
                {
                    Id = 2,
                    Value = "Two points",
                    Description = "Two :(",
                },
                new Rating
                {
                    Id = 3,
                    Value = "Three points",
                    Description = "Three...",
                },
                new Rating
                {
                    Id = 4,
                    Value = "Four points",
                    Description = "Four!!",
                },
                new Rating
                {
                    Id = 5,
                    Value = "Five points",
                    Description = "Five!!!",
                }
            );
            context.SaveChanges();
        }

        private static void InitializeGames(GamesContext context)
        {
            context.Game.AddRange(
                new Game
                {
                    Id = 1,
                    Name = "Far Cry 5",
                    ReleaseYear = "2018",
                    RatingId = 4,
                    GenreId = 1,
                },
                new Game
                {
                    Id = 2,
                    Name = "Medal of Heroes",
                    ReleaseYear = "2007",
                    RatingId = 4,
                    GenreId = 1,
                },
                new Game
                {
                    Id = 3,
                    Name = "Minecraft",
                    ReleaseYear = "2009",
                    RatingId = 5,
                    GenreId = 2,
                },
                new Game
                {
                    Id = 4,
                    Name = "The Secret of Monkey Island",
                    ReleaseYear = "1990",
                    RatingId = 1,
                    GenreId = 2,
                },
                new Game
                {
                    Id = 5,
                    Name = "Dark Souls",
                    ReleaseYear = "2011",
                    RatingId = 4,
                    GenreId = 3,
                },
                new Game
                {
                    Id = 6,
                    Name = "Skyrim",
                    ReleaseYear = "2011",
                    RatingId = 4,
                    GenreId = 3,
                },
                new Game
                {
                    Id = 7,
                    Name = "Age of Empires",
                    ReleaseYear = "1997",
                    RatingId = 3,
                    GenreId = 4,
                },
                new Game
                {
                    Id = 8,
                    Name = "The Sims",
                    ReleaseYear = "2014",
                    RatingId = 4,
                    GenreId = 5,
                },
                new Game
                {
                    Id = 9,
                    Name = "FIFA 18",
                    ReleaseYear = "2017",
                    RatingId = 4,
                    GenreId = 6,
                },
                new Game
                {
                    Id = 10,
                    Name = "Pro Evolution Soccer 2017",
                    ReleaseYear = "2016",
                    RatingId = 3,
                    GenreId = 6,
                },
                new Game
                {
                    Id = 11,
                    Name = "CS: GO",
                    ReleaseYear = "2012",
                    RatingId = 5,
                    GenreId = 7,
                },
                new Game
                {
                    Id = 12,
                    Name = "Call of Duty",
                    ReleaseYear = "2003",
                    RatingId = 4,
                    GenreId = 7,
                }
            );
            context.SaveChanges();
        }

        public static async Task Initialize(IServiceProvider serviceProvider)
        {
            var RoleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();

            string[] roleNames = { "Admin" };
            IdentityResult roleResult;

            foreach (var roleName in roleNames)
            {
                var roleExist = await RoleManager.RoleExistsAsync(roleName);

                if (!roleExist)
                {
                    roleResult = await RoleManager.CreateAsync(new IdentityRole(roleName));
                }
            }

            var _user = await userManager.FindByEmailAsync("admin@email.com");
            if (_user == null)
            {
                var poweruser = new ApplicationUser
                {
                    FirstName = "Admin",
                    LastName = "Kirk",
                    UserName = "admin@email.com",
                    Email = "admin@email.com",
                };
                string adminPassword = "admin";

                var createPowerUser = await userManager.CreateAsync(poweruser, adminPassword);
                if (createPowerUser.Succeeded)
                {
                    await userManager.AddToRoleAsync(poweruser, "Admin");

                }
            }

            ApplicationUser _regularUser = await userManager.FindByEmailAsync("regular@email.com");
            if (_regularUser == null)
            {
                var regularuser = new ApplicationUser
                {
                    FirstName = "Regular",
                    LastName = "Kirk",
                    UserName = "regular@email.com",
                    Email = "regular@email.com",
                };
                string regularPassword = "regular";

                await userManager.CreateAsync(regularuser, regularPassword);
            }

            using (var context = new GamesContext(
                serviceProvider.GetRequiredService<DbContextOptions<GamesContext>>()))
            {
                if (!context.Genre.Any() && !context.Rating.Any() && !context.Game.Any())
                {
                    InitializeGenres(context);
                    InitializeRatings(context);
                    InitializeGames(context);
                }
            }
        }
    }
}
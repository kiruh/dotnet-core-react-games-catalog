using Distributed.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
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
                    Name = "RPG",
                    Description = "RPG Description",
                },
                new Genre
                {
                    Id = 2,
                    Name = "Arcade",
                    Description = "Arcade Description",
                },
                new Genre
                {
                    Id = 3,
                    Name = "Action",
                    Description = "Action Description",
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
                    Value = "1",
                    Description = "One :((",
                },
                new Rating
                {
                    Id = 2,
                    Value = "2",
                    Description = "Two :(",
                },
                new Rating
                {
                    Id = 3,
                    Value = "3",
                    Description = "Three...",
                },
                new Rating
                {
                    Id = 4,
                    Value = "4",
                    Description = "Four!!",
                },
                new Rating
                {
                    Id = 5,
                    Value = "5",
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
                    Name = "Game 1",
                    ReleaseYear = "2018-01-01",
                    RatingId = 1,
                    GenreId = 1,
                },
                new Game
                {
                    Id = 2,
                    Name = "Game 2",
                    ReleaseYear = "2018-02-02",
                    RatingId = 2,
                    GenreId = 2,
                },
                new Game
                {
                    Id = 3,
                    Name = "Game 3",
                    ReleaseYear = "2018-03-03",
                    RatingId = 3,
                    GenreId = 3,
                },
                new Game
                {
                    Id = 4,
                    Name = "Game 4",
                    ReleaseYear = "2018-04-04",
                    RatingId = 4,
                    GenreId = 4,
                },
                new Game
                {
                    Id = 5,
                    Name = "Game 5",
                    ReleaseYear = "2018-05-05",
                    RatingId = 5,
                    GenreId = 5,
                }
            );
            context.SaveChanges();
        }

        public static async Task Initialize(IServiceProvider serviceProvider)
        {
            var RoleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var userManager = serviceProvider.GetRequiredService<UserManager<User>>();

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
                var poweruser = new User
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

            User _regularUser = await userManager.FindByEmailAsync("regular@email.com");
            if (_regularUser == null)
            {
                var regularuser = new User
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
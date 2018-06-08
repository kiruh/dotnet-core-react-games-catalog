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
        const int ACTION_ID = 1;
        const int ADVENTURE_ID = 2;
        const int RPG_ID = 3;
        const int STRATEGY_ID = 4;
        const int SIMULATION_ID = 5;
        const int SPORTS_ID = 6;
        const int SHOOTER_ID = 7;

        private static void InitializeGenres(GamesContext context)
        {

            context.Genre.AddRange(
                new Genre { Id = ACTION_ID, Name = "Action", Description = "Action Description" },
                new Genre { Id = ADVENTURE_ID, Name = "Adventure", Description = "Adventure Description" },
                new Genre { Id = RPG_ID, Name = "RPG", Description = "RPG Description" },
                new Genre { Id = STRATEGY_ID, Name = "Startegy", Description = "Startegy Description" },
                new Genre { Id = SIMULATION_ID, Name = "Simulation", Description = "Simulation Description" },
                new Genre { Id = SPORTS_ID, Name = "Sports", Description = "Sports Description" },
                new Genre { Id = SHOOTER_ID, Name = "Shooter", Description = "Shooter Description" }
            );
            context.SaveChanges();
        }

        private static void InitializeRatings(GamesContext context)
        {
            context.Rating.AddRange(
                new Rating { Id = 1, Value = "1/10", Description = "Very Poor" },
                new Rating { Id = 2, Value = "2/10", Description = "Poor" },
                new Rating { Id = 3, Value = "3/10", Description = "Significantly Below Average" },
                new Rating { Id = 4, Value = "4/10", Description = "Below Average" },
                new Rating { Id = 5, Value = "5/10", Description = "Average" },
                new Rating { Id = 6, Value = "6/10", Description = "Above Average" },
                new Rating { Id = 7, Value = "7/10", Description = "Significantly Above Average" },
                new Rating { Id = 8, Value = "8/10", Description = "Good" },
                new Rating { Id = 9, Value = "9/10", Description = "Very Good" },
                new Rating { Id = 10, Value = "10/10", Description = "Best" }
            );
            context.SaveChanges();
        }

        private static void InitializeGames(GamesContext context)
        {
            context.Game.AddRange(
                new Game
                {
                    Name = "Far Cry 5",
                    ReleaseYear = "2018",
                    RatingId = 6,
                    GenreId = ACTION_ID,
                    Company = "Ubisoft",
                },
                new Game
                {
                    Name = "Medal of Honor: Heroes",
                    ReleaseYear = "2007",
                    RatingId = 7,
                    GenreId = ACTION_ID,
                    Company = "Team Fusion",
                },
                new Game
                {
                    Name = "Minecraft",
                    ReleaseYear = "2009",
                    RatingId = 9,
                    GenreId = ADVENTURE_ID,
                    Company = "Mojang",
                },
                new Game
                {
                    Name = "The Secret of Monkey Island",
                    ReleaseYear = "1990",
                    RatingId = 10,
                    GenreId = ADVENTURE_ID,
                    Company = "Lucasfilm games",
                },
                new Game
                {
                    Name = "Dark Souls",
                    ReleaseYear = "2011",
                    RatingId = 9,
                    GenreId = RPG_ID,
                    Company = "Bandai Games",
                },
                new Game
                {
                    Name = "Skyrim",
                    ReleaseYear = "2011",
                    RatingId = 9,
                    GenreId = RPG_ID,
                    Company = "Bethesda Softworks",
                },
                new Game
                {
                    Name = "Age of Empires",
                    ReleaseYear = "1997",
                    RatingId = 6,
                    GenreId = STRATEGY_ID,
                    Company = "Microsoft Studios",
                },
                new Game
                {
                    Name = "The Sims",
                    ReleaseYear = "2014",
                    RatingId = 8,
                    GenreId = SIMULATION_ID,
                    Company = "Electronic Arts",
                },
                new Game
                {
                    Name = "FIFA 18",
                    ReleaseYear = "2017",
                    RatingId = 9,
                    GenreId = SPORTS_ID,
                    Company = "Electronic Arts",
                },
                new Game
                {
                    Name = "Pro Evolution Soccer 2017",
                    ReleaseYear = "2016",
                    RatingId = 7,
                    GenreId = SPORTS_ID,
                    Company = "Konami",
                },
                new Game
                {
                    Name = "CS: GO",
                    ReleaseYear = "2012",
                    RatingId = 9,
                    GenreId = SHOOTER_ID,
                    Company = "Hidden Path Entertainment and Valve Corporation",
                },
                new Game
                {
                    Name = "Call of Duty",
                    ReleaseYear = "2003",
                    RatingId = 9,
                    GenreId = SHOOTER_ID,
                    Company = "Sledgehammer Games",
                },
                new Game
                {
                    Name = "Lara Croft GO",
                    ReleaseYear = "2016",
                    RatingId = 5,
                    GenreId = STRATEGY_ID,
                    Company = "Square Enix Montreal",
                },
                new Game
                {
                    Name = "Destiny 2",
                    ReleaseYear = "2017",
                    RatingId = 4,
                    GenreId = ADVENTURE_ID,
                    Company = "Activision",
                },
                new Game
                {
                    Name = "Madden NFL 18",
                    ReleaseYear = "2017",
                    RatingId = 3,
                    GenreId = SPORTS_ID,
                    Company = "Electronic Arts",
                },
                new Game
                {
                    Name = "Super rude vear resurrection",
                    ReleaseYear = "2017",
                    RatingId = 2,
                    GenreId = ACTION_ID,
                    Company = "Alex Rose",
                },
                new Game
                {
                    Name = "NBA 2K18",
                    ReleaseYear = "2017",
                    RatingId = 1,
                    GenreId = SPORTS_ID,
                    Company = "Visual Concepts",
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
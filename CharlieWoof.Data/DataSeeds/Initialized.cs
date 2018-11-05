using System;
using System.Collections.Generic;
using CharlieWoof.Core.Enums;
using CharlieWoof.Core.Models;
using CharlieWoof.Data.Models;

namespace CharlieWoof.Data.DataSeeds
{
    public class CreateDatabaseIfNotExists
    {
        protected CWDataContext Context;
        public CreateDatabaseIfNotExists(CWDataContext context) { this.Context = context; }

        public void WriteInitialData()
        {
            //system content defaults
            AddUsers();
            AddMagicPages();
            this.Context.SaveChanges();
        }

        private void AddUsers()
        {
            var list = new List<User>
            {
                new User
                {
                    Id = new Guid("bf8a963e-5fdf-43d3-9b00-c4911c6b208d"),
                    CreatedOnUtc = DateTime.UtcNow,
                    UpdatedByUserId = Guid.Empty,
                    UpdatedOnUtc = DateTime.UtcNow,
                    Firstname = "Bohdan",
                    Secondname = "Yarchak",
                    Role = MagicRoles.Admin,
                    Email = "yarchak.bohdan@gmail.com",
                    PasswordHash = "0xF767350B9F90B42B2EDDA248895A62BDC6B8A9DC536FD7670C2D1C7358D09E87",
                    Har = String.Empty,
                    Phone = String.Empty,
                    PhotoUrl = String.Empty,
                },
                new User
                {
                    Id = new Guid("bf8a963e-5fdf-43d3-9b00-c4911c6b20d0"),
                    CreatedOnUtc = DateTime.UtcNow,
                    UpdatedByUserId = Guid.Empty,
                    UpdatedOnUtc = DateTime.UtcNow,
                    Firstname = "Vira",
                    Secondname = "Yarchak",
                    Email = "virenyarchak@gmail.com",
                    Role = MagicRoles.Admin,
                    PasswordHash = "0xF767350B9F90B42B2EDDA248895A62BDC6B8A9DC536FD7670C2D1C7358D09E87",
                    Har = String.Empty,
                    Phone = String.Empty,
                    PhotoUrl = String.Empty,
                },
                   
                    new User
                    {
                            Id = new Guid("bf8a963e-5f6f-43d3-9b11-14911c6b218d"),
                            CreatedOnUtc = DateTime.UtcNow,
                            UpdatedByUserId = Guid.Empty,
                            UpdatedOnUtc = DateTime.UtcNow,
                            Firstname = "Demo",
                            Secondname = "Trader",
                            Role = MagicRoles.Trader,
                            Email = "demo@capitalwave.com",
                            PasswordHash = "0xF767350B9F90B42B2EDDA248895A62BDC6B8A9DC536FD7670C2D1C7358D09E87",
                            Har = String.Empty,
                            Phone = String.Empty,
                            PhotoUrl = String.Empty,
                    },
            };

            this.Context.Users.AddRange(list);
        }

        private void AddMagicPages()
        {
            var list = MagicPackage.GetPages();
            this.Context.MagicPages.AddRange(list);
        }
    }
}
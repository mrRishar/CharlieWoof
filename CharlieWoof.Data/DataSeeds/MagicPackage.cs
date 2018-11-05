using System;
using System.Collections.Generic;
using CharlieWoof.Core.Enums;
using CharlieWoof.Core.Models.MagicPackage;

namespace CharlieWoof.Data.DataSeeds
{
    public class MagicPackage
    {
        public static List<MagicPage> GetPages()
        {
            return new List<MagicPage>
            {
                AddPage("Login", "Login",  MagicPagesTypes.Login),
                AddPage("Register", "Register",  MagicPagesTypes.Register),
                    AddPage("Restore Password", "Restore Password",  MagicPagesTypes.RestorePassword),
                    AddPage("Contacts", "Contacts",  MagicPagesTypes.Contacts),
                    AddPage("Home", "Home",  MagicPagesTypes.Home),
                    AddPage("FAQ", "FAQ",  MagicPagesTypes.FAQ),
                    AddPage("About Us", "AboutUs",  MagicPagesTypes.AboutUs),
                    AddPage("Privacy Policy", "Privacy Policy",  MagicPagesTypes.PrivacyPolicy),
                    AddPage("Disclaimer", "Disclaimer",  MagicPagesTypes.Disclaimer),
                    AddPage("Terms", "Terms",  MagicPagesTypes.Terms),
                    AddPage("Instructions", "Instructions",  MagicPagesTypes.Instructions),
            };
        }


        private static MagicPage AddPage(string title, string content, MagicPagesTypes pagesType)
        {
            return new MagicPage
            {
                UpdatedByUserId = Guid.Empty,
                CreatedOnUtc = DateTime.UtcNow,
                UpdatedOnUtc = DateTime.UtcNow,
                Title = title,
                Description = title,
                SeoDescription = title,
                SeoTitle = title,
                Content = content,
                Url = String.Empty,
                Type = pagesType
            };
        }
    }
}
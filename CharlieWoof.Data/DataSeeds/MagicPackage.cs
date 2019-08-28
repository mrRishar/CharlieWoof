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
                AddPage("HomeSlider", "HomeSlider",  MagicPagesTypes.HomeSlider),
                AddPage("AboutUs", "AboutUs",  MagicPagesTypes.AboutUs),
                AddPage("Services", "Services",  MagicPagesTypes.Services),
                AddPage("Instagram", "Instagram",  MagicPagesTypes.Instagram),
                AddPage("Appointment", "Appointment",  MagicPagesTypes.Appointment),
                AddPage("Pricing", "Pricing",  MagicPagesTypes.Pricing),
                AddPage("CoursesOfGrooming", "CoursesOfGrooming",  MagicPagesTypes.CoursesOfGrooming),
                AddPage("Testimonial", "Testimonial",  MagicPagesTypes.Testimonial),
                AddPage("Contact", "Contact",  MagicPagesTypes.Contact)
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
                SeoKeywords = String.Empty,
                SeoTitle = title,
                Content = content,
                Type = pagesType
            };
        }
    }
}
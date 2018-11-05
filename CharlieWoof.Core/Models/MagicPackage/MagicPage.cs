using System;
using System.Collections.Generic;
using CharlieWoof.Core.Enums;
using CharlieWoof.Core.Implementations.PrimitiveBase;

namespace CharlieWoof.Core.Models.MagicPackage
{
    public partial class MagicPage:PrimaryTrackableStatable<Guid>
    {
        public MagicPage()
        {
            HistoricalMagicPages = new HashSet<HistoricalMagicPage>();
        }

        public MagicPagesTypes Type { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }
        public string SeoTitle { get; set; }
        public string SeoDescription { get; set; }
        public string Url { get; set; }

        public ICollection<HistoricalMagicPage> HistoricalMagicPages { get; set; }
    }
}
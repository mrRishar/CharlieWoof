using System;
using CharlieWoof.Core.Enums;
using CharlieWoof.Core.Implementations.PrimitiveBase;

namespace CharlieWoof.Core.Models.MagicPackage
{
    public partial class HistoricalMagicPage:PrimaryTrackableStatable<Guid>
    {
        public Guid MagicPageId { get; set; }
        public MagicPagesTypes Type { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }
        public string SeoTitle { get; set; }
        public string SeoDescription { get; set; }
        public string SeoKeywords { get; set; }

        public MagicPage MagicPage { get; set; }
    }
}
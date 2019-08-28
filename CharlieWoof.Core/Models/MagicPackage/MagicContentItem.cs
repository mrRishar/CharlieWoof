using System;
using System.Collections.Generic;
using CharlieWoof.Core.Enums;
using CharlieWoof.Core.Implementations.PrimitiveBase;

namespace CharlieWoof.Core.Models.MagicPackage
{
    public partial class MagicContentItem:PrimaryTrackableStatable<Guid>
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }
        public string Icon { get; set; }
        public string Css { get; set; }
        public string Color { get; set; }
        public string Image { get; set; }
        public int SortNumder { get; set; }
        public Guid MagicPageId { get; set; }
    }
}
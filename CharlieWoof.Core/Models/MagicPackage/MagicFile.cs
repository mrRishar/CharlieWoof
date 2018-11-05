using System;
using CharlieWoof.Core.Enums;
using CharlieWoof.Core.Implementations.PrimitiveBase;

namespace CharlieWoof.Core.Models.MagicPackage
{
    public partial class MagicFile:PrimaryTrackableStatable<Guid>
    {
        public string Name { get; set; }
        public string FileName { get; set; }
        public MagicFileTypes Type { get; set; }

        public User UpdatedByUser { get; set; }
    }
}

using System;
using CharlieWoof.Core.Implementations.PrimitiveBase;

namespace CharlieWoof.Core.Models.MagicPackage
{
    public partial class Pet :PrimaryTrackableStatable<Guid>
    {
        public string Name { get; set; }
        public string Breed { get; set; }
        public DateTime Birthday { get; set; }
        public string Note { get; set; }
        public string Image { get; set; }
        public Guid OwnerUserId { get; set; }
    }
}
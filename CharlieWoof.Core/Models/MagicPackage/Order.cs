using System;
using CharlieWoof.Core.Enums;
using CharlieWoof.Core.Implementations.PrimitiveBase;

namespace CharlieWoof.Core.Models.MagicPackage
{
    public partial class Order :PrimaryTrackableStatable<Guid>
    {
        public string Note { get; set; }
        public double Price { get; set; }
        public ServicesOrder Services { get; set; }
        public Status Status { get; set; }
        public DateTime Date { get; set; }
        public Guid? PetId { get; set; }
        public Guid UserId { get; set; }
        public Guid? GrummerUserId { get; set; }
    }
}
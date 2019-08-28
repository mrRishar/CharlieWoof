using System;
using CharlieWoof.Core.Abstractions.PrimitiveBase;

namespace CharlieWoof.Core.Implementations.PrimitiveBase
{
    public abstract class PrimaryTrackableStatable<TPrimary> : IPrimary<TPrimary>, ITrackable<TPrimary>, IStatable
    {
        public TPrimary Id { get; set; }
        public DateTime UpdatedOnUtc { get; set; }
        public DateTime CreatedOnUtc { get; set; }
        public TPrimary UpdatedByUserId { get; set; }
        public bool IsDeleted { get; set; }
    }
}
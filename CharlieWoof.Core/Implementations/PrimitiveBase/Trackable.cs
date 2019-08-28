using System;
using CharlieWoof.Core.Abstractions.PrimitiveBase;

namespace CharlieWoof.Core.Implementations.PrimitiveBase
{
    public class Trackable<TPrimaryKeyType> : ITrackable<TPrimaryKeyType>
    {
        public DateTime UpdatedOnUtc { get; set; }
        public DateTime CreatedOnUtc { get; set; }
        public TPrimaryKeyType UpdatedByUserId { get; set; }
    }
}
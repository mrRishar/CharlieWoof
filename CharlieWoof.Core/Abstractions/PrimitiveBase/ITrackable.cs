using System;

namespace CharlieWoof.Core.Abstractions.PrimitiveBase
{
    public interface ITrackable<TPrimaryKeyType>
    {
        DateTime UpdatedOnUtc { get; set; }
        DateTime CreatedOnUtc { get; set; }
        TPrimaryKeyType UpdatedByUserId { get; set; }
    }
}
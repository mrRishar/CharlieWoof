using System;
using CharlieWoof.Core.Abstractions.PrimitiveBase;
using CharlieWoof.Core.Enums;
using CharlieWoof.Core.Implementations.PrimitiveBase;

namespace CharlieWoof.Core.Models.MagicPackage
{
    public partial class MagicFile : PrimaryTrackableStatable<Guid>

    {
        public string Name { get; set; }
        public string FileName { get; set; }
        public MagicFileTypes Type { get; set; }
        public User UpdatedByUser { get; set; }
    }

    //public partial class MagicFile : IPrimary<Guid> , ITrackable<Guid>, IStatable   
    //{
    //    public Guid Id { get; set; }
    //    public DateTime CreatedOnUtc { get; set; }
    //    public byte EmagicFileType { get; set; }
    //    public string FileName { get; set; }
    //    public bool IsDeleted { get; set; }
    //    public string Name { get; set; }
    //    public Guid UpdatedByUserId { get; set; }
    //    public DateTime UpdatedOnUtc { get; set; }

    //    public User UpdatedByUser { get; set; }
    //}
}

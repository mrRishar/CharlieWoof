using CharlieWoof.Core.Abstractions.PrimitiveBase;

namespace CharlieWoof.Core.Implementations.PrimitiveBase
{
    public class Statable : IStatable
    {
        public bool IsDeleted { get; set; }
    }
}
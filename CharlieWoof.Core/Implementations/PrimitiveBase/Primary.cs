using CharlieWoof.Core.Abstractions.PrimitiveBase;

namespace CharlieWoof.Core.Implementations.PrimitiveBase
{
    public class Primary<T> : IPrimary<T>
    {
        public T Id { get; set; }
    }
}
namespace CharlieWoof.Core.Abstractions.PrimitiveBase
{
    public interface IPrimary<T>
    {
        T Id { get; set; }
    }
}
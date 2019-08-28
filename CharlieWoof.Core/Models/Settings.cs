using System;
using CharlieWoof.Core.Abstractions.PrimitiveBase;
using CharlieWoof.Core.Enums;
using CharlieWoof.Core.Implementations.PrimitiveBase;

namespace CharlieWoof.Core.Models
{
    /// <summary>
    ///     * SystemSettings are instance level variables, stored in the DB for convenience (and to minimise
    /// code differences between installations.)
    /// Its a simple key/value store.
    /// If you find yourself wanting to fork the code to make it behave differently for ICMA or CQF or
    /// something, think about making the change controlled by a setting in here...
    /// </summary>
    public class Setting : Trackable<Guid>, IPrimary<Guid>, IStatable
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public string Value { get; set; }
        public bool IsDeleted { get; set; }
        public Settings Type { get; set; }
    }
}
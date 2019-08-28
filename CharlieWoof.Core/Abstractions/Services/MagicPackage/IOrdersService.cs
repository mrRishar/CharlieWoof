using System;
using System.Collections.Generic;
using CharlieWoof.Core.Abstractions.PrimitiveServices;
using CharlieWoof.Core.Models.MagicPackage;

namespace CharlieWoof.Core.Abstractions.Services.MagicPackage
{
    public interface IOrdersService : IStatableService<Order, Guid, Guid>
    {
        IEnumerable<Order> GetForUser(Guid userId);
        IEnumerable<Order> OrderInfo(Guid userId);

    }
}

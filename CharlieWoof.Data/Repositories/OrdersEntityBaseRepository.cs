using System;
using CharlieWoof.Core.Models.MagicPackage;
using CharlieWoof.Data.Repository;


namespace CharlieWoof.Data.Repositories
{
    public class OrdersEntityBaseRepository : StatableEntityBaseRepository<Order, Guid, Guid>
    {
        public OrdersEntityBaseRepository(DataContextProvider context) : base(context)
        {
        }
    }
}
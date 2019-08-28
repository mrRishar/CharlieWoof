using System;
using System.Collections.Generic;
using AutoMapper;
using CharlieWoof.Core.Abstractions.Services.MagicPackage;
using CharlieWoof.Core.Enums;
using CharlieWoof.Core.Models.MagicPackage;
using CharlieWoof.Data.Abstractions;
using CharlieWoof.Services.Implementations;

namespace CharlieWoof.Services.Services.MagicPackage
{
    public class OrdersService : StatableService<Order, Order, Guid, Guid>, IOrdersService
    {
        public OrdersService(IStatableEntityBaseRepository<Order, Guid, Guid> repository, IMapper mapper) : base(repository, mapper)
        {
        }


        public IEnumerable<Order> GetForUser(Guid userId)
        {
            return this.GetAll(x => x.UserId == userId);
        }

        public IEnumerable<Order> OrderInfo(Guid userId)
        {
            throw new NotImplementedException();
        }
    }
}
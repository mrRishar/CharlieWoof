using System;
using CharlieWoof.Core.Models;
using CharlieWoof.Data.Repository;

namespace CharlieWoof.Data.Repositories
{
    public class UsersEntityBaseRepository : StatableEntityBaseRepository<User, Guid, Guid>
    {
        public UsersEntityBaseRepository(DataContextProvider context) : base(context)
        {
        }
    }
}
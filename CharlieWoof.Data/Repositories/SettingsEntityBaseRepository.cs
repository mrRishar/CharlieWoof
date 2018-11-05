using System;
using CharlieWoof.Core.Models;
using CharlieWoof.Data.Repository;

namespace CharlieWoof.Data.Repositories
{
    public class SettingsEntityBaseRepository : StatableEntityBaseRepository<Setting, Guid, Guid>
    {
        public SettingsEntityBaseRepository(DataContextProvider context) : base(context)
        {
        }
    }
}
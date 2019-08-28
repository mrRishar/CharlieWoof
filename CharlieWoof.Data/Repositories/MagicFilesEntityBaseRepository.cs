using System;
using CharlieWoof.Core.Models.MagicPackage;
using CharlieWoof.Data.Repository;

namespace CharlieWoof.Data.Repositories
{
    public class MagicFilesEntityBaseRepository : StatableEntityBaseRepository<MagicFile, Guid, Guid>
    {
        public MagicFilesEntityBaseRepository(DataContextProvider context) : base(context)
        {
        }
    }
}
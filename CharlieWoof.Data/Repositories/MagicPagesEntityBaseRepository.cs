using System;
using CharlieWoof.Core.Models.MagicPackage;
using CharlieWoof.Data.Repository;


namespace CharlieWoof.Data.Repositories
{
    public class MagicPagesEntityBaseRepository : StatableEntityBaseRepository<MagicPage, Guid, Guid>
    {
        public MagicPagesEntityBaseRepository(DataContextProvider context) : base(context)
        {
        }
    }
}
using System;
using CharlieWoof.Core.Models.MagicPackage;
using CharlieWoof.Data.Repository;


namespace CharlieWoof.Data.Repositories
{
    public class MagicContentItemsEntityBaseRepository : StatableEntityBaseRepository<MagicContentItem, Guid, Guid>
    {
        public MagicContentItemsEntityBaseRepository(DataContextProvider context) : base(context)
        {
        }
    }
}
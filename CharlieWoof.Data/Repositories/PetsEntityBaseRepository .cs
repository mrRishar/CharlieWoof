using System;
using CharlieWoof.Core.Models.MagicPackage;
using CharlieWoof.Data.Repository;


namespace CharlieWoof.Data.Repositories
{
    public class PetsEntityBaseRepository : StatableEntityBaseRepository<Pet, Guid, Guid>
    {
        public PetsEntityBaseRepository(DataContextProvider context) : base(context)
        {
        }
    }
}
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
    public class PetsService : StatableService<Pet, Pet, Guid, Guid>, IPetsService
    {
        public PetsService(IStatableEntityBaseRepository<Pet, Guid, Guid> repository, IMapper mapper) : base(repository, mapper)
        {
        }

        public IEnumerable<Pet> GetForOwner(Guid ownerId)
        {
            return this.GetAll(x => x.OwnerUserId == ownerId);
        }

        //public IEnumerable<Pet> Get(Guid PetId)
        //{
        //    return this.GetAll(x => x.OwnerUserId == PetId);
        //}
    }
}
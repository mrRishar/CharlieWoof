﻿using System;
using System.Collections.Generic;
using CharlieWoof.Core.Abstractions.PrimitiveServices;
using CharlieWoof.Core.Models.MagicPackage;

namespace CharlieWoof.Core.Abstractions.Services.MagicPackage
{
    public interface IPetsService : IStatableService<Pet, Guid, Guid>
    {
        IEnumerable<Pet> GetForOwner(Guid ownerId);
    }
}

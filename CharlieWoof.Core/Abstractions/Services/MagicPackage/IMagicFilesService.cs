using System;
using System.Collections.Generic;
using CharlieWoof.Core.Abstractions.PrimitiveServices;
using CharlieWoof.Core.Models.MagicPackage;

namespace CharlieWoof.Core.Abstractions.Services.MagicPackage
{
    public interface IMagicFilesService : IStatableService<MagicFile, Guid, Guid>
    {
        IEnumerable<MagicFile> GetFiles();

        IEnumerable<MagicFile> GetImages();
    }
}
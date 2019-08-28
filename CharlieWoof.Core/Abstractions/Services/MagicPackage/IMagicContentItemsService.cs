using System;
using System.Collections.Generic;
using CharlieWoof.Core.Abstractions.PrimitiveServices;
using CharlieWoof.Core.Models.MagicPackage;

namespace CharlieWoof.Core.Abstractions.Services.MagicPackage
{
    public interface IMagicContentItemsService : IStatableService<MagicContentItem, Guid, Guid>
    {
        IEnumerable<MagicContentItem> GetForMagicPage(Guid magicPageId);

    }
}

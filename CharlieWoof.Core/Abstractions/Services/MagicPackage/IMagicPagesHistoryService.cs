using System;
using System.Collections.Generic;
using CharlieWoof.Core.Abstractions.PrimitiveServices;
using CharlieWoof.Core.Models.MagicPackage;

namespace CharlieWoof.Core.Abstractions.Services.MagicPackage
{
    public interface IMagicPagesHistoryService : IStatableService<HistoricalMagicPage, Guid, Guid>
    {
        IEnumerable<HistoricalMagicPage> GetAllForMagicPage(Guid idMagicPage);

        void RestoreAndSave(HistoricalMagicPage model, IMagicPagesService magicPagesService);

        HistoricalMagicPage BackUp(MagicPage model);
        void BackUpAndSave(MagicPage model, Guid updatedByUserId);
    }
}
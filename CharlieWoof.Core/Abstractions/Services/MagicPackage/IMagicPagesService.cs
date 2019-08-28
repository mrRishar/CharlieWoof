using System;
using CharlieWoof.Core.Abstractions.PrimitiveServices;
using CharlieWoof.Core.Enums;
using CharlieWoof.Core.Models.MagicPackage;

namespace CharlieWoof.Core.Abstractions.Services.MagicPackage
{
    public interface IMagicPagesService : IStatableService<MagicPage, Guid, Guid>
    {
        MagicPage GetForType(MagicPagesTypes Type);
        void UpdateAndBackup(MagicPage model, Guid updateByUserId, IMagicPagesHistoryService MagicPagesHistoryService);
    }
}
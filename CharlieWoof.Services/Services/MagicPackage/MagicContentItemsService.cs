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
    public class MagicContentItemsService : StatableService<MagicContentItem, MagicContentItem, Guid, Guid>, IMagicContentItemsService
    {
        public MagicContentItemsService(IStatableEntityBaseRepository<MagicContentItem, Guid, Guid> repository, IMapper mapper) : base(repository, mapper)
        {
        }

        public IEnumerable<MagicContentItem> GetForMagicPage(Guid magicPageId)
        {
            return this.GetAll(x => x.MagicPageId == magicPageId);
        }
    }
}
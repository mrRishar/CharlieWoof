using System;
using AutoMapper;
using CharlieWoof.Core.Abstractions.Services.MagicPackage;
using CharlieWoof.Core.Enums;
using CharlieWoof.Core.Models.MagicPackage;
using CharlieWoof.Data.Abstractions;
using CharlieWoof.Services.Implementations;

namespace CharlieWoof.Services.Services.MagicPackage
{
    public class MagicPagesService : StatableService<MagicPage, MagicPage, Guid, Guid>, IMagicPagesService
    {
        public MagicPagesService(IStatableEntityBaseRepository<MagicPage, Guid, Guid> repository, IMapper mapper) : base(repository, mapper)
        { }

        public MagicPage GetForType(MagicPagesTypes type)
        {
            var page = this.Repository.GetOne(f => f.Type == type);

            return Mapper.Map<MagicPage, MagicPage>(page);
        }

        public void UpdateAndBackup(MagicPage model, Guid updateByUserId, IMagicPagesHistoryService magicPagesHistoryService)
        {
            //backup model before saving changes
            magicPagesHistoryService.BackUpAndSave(this.Get(model.Id), updateByUserId);

            this.Update(model, updateByUserId);
        }
    }
}
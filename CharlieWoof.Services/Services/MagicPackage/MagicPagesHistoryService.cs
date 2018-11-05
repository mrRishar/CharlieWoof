using System;
using System.Collections.Generic;
using AutoMapper;
using CharlieWoof.Core.Abstractions.Services.MagicPackage;
using CharlieWoof.Core.Models.MagicPackage;
using CharlieWoof.Data.Abstractions;
using CharlieWoof.Services.Implementations;

namespace CharlieWoof.Services.Services.MagicPackage
{
    public class MagicPagesHistoryService : StatableService<HistoricalMagicPage, HistoricalMagicPage, Guid, Guid>, IMagicPagesHistoryService
    {
        public MagicPagesHistoryService(IStatableEntityBaseRepository<HistoricalMagicPage, Guid, Guid> repository, IMapper mapper) : base(repository, mapper)
        { }

        public IEnumerable<HistoricalMagicPage> GetAllForMagicPage(Guid MagicPageId)
        {
            return this.GetAll(f => f.MagicPageId == MagicPageId);
        }

        public void RestoreAndSave(HistoricalMagicPage model, IMagicPagesService MagicPagesService)
        {
            var original = MagicPagesService.Get(model.MagicPageId);

            original.Content = model.Content;
            original.Description = model.Description;
            original.SeoDescription = model.SeoDescription;
            original.SeoTitle = model.SeoTitle;
            original.Title = model.Title;
            original.Url = model.Url;

            MagicPagesService.Update(original, model.UpdatedByUserId);
        }


        public HistoricalMagicPage BackUp(MagicPage model)
        {
            return new HistoricalMagicPage
            {
                MagicPageId = model.Id,
                UpdatedByUserId = model.UpdatedByUserId,
                Content = model.Content,
                Description = model.Description,
                Type = model.Type,
                SeoDescription = model.SeoDescription,
                SeoTitle = model.SeoTitle,
                Title = model.Title,
                Url = model.Url
            };
        }

        public void BackUpAndSave(MagicPage model, Guid UpdatedByUserId)
        {
            this.Add(this.BackUp(model), UpdatedByUserId);
        }
    }
}
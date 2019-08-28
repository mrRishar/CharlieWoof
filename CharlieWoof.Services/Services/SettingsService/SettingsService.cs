using System;
using AutoMapper;
using CharlieWoof.Core.Abstractions.Services;
using CharlieWoof.Core.Enums;
using CharlieWoof.Core.Models;
using CharlieWoof.Data.Abstractions;
using CharlieWoof.Services.Implementations;



namespace CharlieWoof.Services.Services.SettingsService
{
    public class SettingsService : StatableService<Setting, Setting, Guid, Guid>, ISettingsService
    {
        public SettingsService(IStatableEntityBaseRepository<Setting, Guid, Guid> repository, IMapper mapper) : base(repository, mapper)
        {
        }

        public Setting GetFotType(Settings settings)
        {
            return this.Get(f => f.Type == settings);
        }

        public string GetValue(Settings settings)
        {
            return this.GetFotType(settings)?.Value;
        }
    }

}

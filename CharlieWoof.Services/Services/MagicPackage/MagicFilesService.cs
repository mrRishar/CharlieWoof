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
    public class MagicFilesService : StatableService<MagicFile, MagicFile, Guid, Guid>, IMagicFilesService
    {
        public MagicFilesService(IStatableEntityBaseRepository<MagicFile, Guid, Guid> repository, IMapper mapper) : base(repository, mapper)
        { }

        public IEnumerable<MagicFile> GetFiles()
        {
            return this.GetAll(f => f.Type == MagicFileTypes.File);
        }

        public IEnumerable<MagicFile> GetImages()
        {
            return this.GetAll(f => f.Type == MagicFileTypes.Image);
        }
    }
}
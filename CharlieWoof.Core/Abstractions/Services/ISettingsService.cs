using System;
using CharlieWoof.Core.Abstractions.PrimitiveServices;
using CharlieWoof.Core.Enums;
using CharlieWoof.Core.Models;

namespace CharlieWoof.Core.Abstractions.Services
{
    public interface ISettingsService : IService<Setting, Guid>
    {
        Setting GetFotType(Settings settings);
        string GetValue(Settings settings);
    }
}
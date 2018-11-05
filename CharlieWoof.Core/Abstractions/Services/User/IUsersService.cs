using System;
using CharlieWoof.Core.Abstractions.PrimitiveServices;

namespace CharlieWoof.Core.Abstractions.Services.User
{
    public interface IUsersService : IStatableService<Models.User, Guid, Guid>
    {
        bool IsNewPassword(Guid userId, string newPassword);
        void UpdatePassword(Guid userId, Guid updatedByUserId, string password);
        bool TryUpdatePassword(Guid userId, Guid updatedByUserId, string password, string oldPassword);
        Models.User Get(string login, string password);
    }
}
using System.IO;
using System.Linq;
using CharlieWoof.Core.Constants;
using CharlieWoof.Core.Enums;
using CharlieWoof.Core.Models;

namespace CharlieWoof.Services.Services.UserService
{
    public static class UserExtenssions
    {
        public static bool IsInRole(this User model, params MagicRoles[] roles)
        {
            return roles.Contains(model.Role);
        }

        public static string GetFullName(this User model)
        {
            return model.Firstname + " " + model.Secondname;
        }

        public static string GetUserImagePath(this User model)
        {
            return Path.Combine(Paths.UserImage, "no-avatar.jpg");
        }
    }
}
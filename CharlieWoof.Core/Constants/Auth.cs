using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace CharlieWoof.Core.Constants
{
    public class Auth
    {
        public static SymmetricSecurityKey Key => new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is probably the best key ever"));
        public const string Issuer = "CWWebApi";
        public const string Audience = "CWWebApi_Audi";
        public const string AdminOnlyPolicy = "AdminOnlyPolicy";
    }
}
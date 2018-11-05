using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace CharlieWoof.Core.Constants
{
    public class Auth
    {
        public static SymmetricSecurityKey Key => new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is probably the best key ever"));
        public static string Issuer => "ICTraderWebApi";
        public static string Audience => "ICTraderWebApi_Audi";
        public static string AdminOnlyPolicy => "AdminOnlyPolicy";
    }
}
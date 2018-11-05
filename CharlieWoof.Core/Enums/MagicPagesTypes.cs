using System.ComponentModel;

namespace CharlieWoof.Core.Enums
{
    public enum MagicPagesTypes : byte
    {
        Login = 1,
        Register = 2,
        [Description("Restore Password")]
        RestorePassword = 3,
        Home = 4,
        Contacts = 5,

        FAQ = 6,
        [Description("About Us")]
        AboutUs = 7,
        Instructions = 8,
        Disclaimer = 9,
        Terms = 10,
        [Description("Privacy Policy")]
        PrivacyPolicy = 11,
    }
}
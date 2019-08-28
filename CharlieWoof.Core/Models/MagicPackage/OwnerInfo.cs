using System;

namespace CharlieWoof.Core.Models.MagicPackage
{
    public partial class OwnerInfo : Pet
    {
        public string OrderName { get; set; }
        public string OwnerName { get; set; }
        public string GrummerName { get; set; }
    }
}
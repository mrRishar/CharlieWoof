using System;
using System.Collections.Generic;

namespace CharlieWoof.Core.Models.MagicPackage
{
    public partial class OrderInfo : Order
    {
        public string PetName { get; set; }
        public string UserName { get; set; }
        public string GrummerName { get; set; }
        public string UserPhone { get; set; }
        //public IEnumerable<User> Grummers { get; set; }
    }
}
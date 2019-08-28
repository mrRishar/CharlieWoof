using System.Collections.Generic;

namespace CharlieWoof.Core.Models.MagicPackage
{
    public partial class UserWithPets : User
    {
        public IEnumerable<Pet> Pets { get; set; }
    }
}
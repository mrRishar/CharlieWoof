using System;
using CharlieWoof.Core.Enums;
using CharlieWoof.Core.Implementations.PrimitiveBase;

namespace CharlieWoof.Core.Models
{
    public class User : PrimaryTrackableStatable<Guid>
    {
        public string Firstname { get; set; }
        public string Secondname { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Birthday { get; set; }
        public string Street { get; set; }
        public string Note { get; set; }
        public MagicRoles Role { get; set; }

        public string PasswordHash { get; set; }
        public string PhotoUrl { get; set; }
  }
}
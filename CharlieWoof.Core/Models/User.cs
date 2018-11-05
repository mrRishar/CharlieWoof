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
        public MagicRoles Role { get; set; }

        public string PasswordHash { get; set; }
        public string PhotoUrl { get; set; }

        public int IsEmailadayType { get; set; }
        public bool IsMarketingAllowed { get; set; }
        public bool IsSendNewsletter { get; set; }
        public bool IsGlobalDeactivate { get; set; }
       // public RdrTrainingRequirements RdrTrainingRequirements{ get; set; }
        public bool IsRdrQualificationsCorrect { get; set; }
        public bool IsRdrStudyQualificationsCorrect { get; set; }
        public string Har { get; set; }
        public bool ShowMobile { get; set; }
        public bool IsOnline { get; set; }
    }
}
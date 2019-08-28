using System;

namespace CharlieWoof.RestAPI.Areas.v1.Models.Notifications
{
    public class SendedEmail : AddToCourses
    {
        public string Email { get; set; }
        public string Services { get; set; }
        public string Breed { get; set; }
        public DateTime Date { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string Message { get; set; }
    }
}

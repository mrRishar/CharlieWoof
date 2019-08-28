using System;
using System.Text;

namespace Charts
{
    public class FlagDate : IFlag<DateTime>
    {
        public string Text { get; set; }
        public string Title { get; set; }

        public DateTime Value { get; set; }

        public string Draw()
        {
            StringBuilder data11 = new StringBuilder();

            data11.Append("{ x: ");
            data11.Append(DateTimeToUnixTimestamp(this.Value) + "000");
            data11.Append(", title: '");
            data11.Append(this.Title);
            data11.Append("', text: '");
            data11.Append(this.Text);
            data11.Append("'}");

            return data11.ToString();
        }


        private static int DateTimeToUnixTimestamp(DateTime dateTime)
        {
            return (int)(TimeZoneInfo.ConvertTimeToUtc(dateTime) - new DateTime(1970, 1, 1)).TotalSeconds;
        }

    }
}

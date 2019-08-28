using System;

namespace Extensions.Date
{
    public static class UnixTimes
    {

        //credits to ScottCher
        //reference http://stackoverflow.com/questions/249760/how-to-convert-a-unix-timestamp-to-datetime-and-vice-versa
        public static DateTime UnixTimestampToDateTime(double unixTimeStamp)
        {
            //Unix timestamp Is seconds past epoch
            return new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc).AddSeconds(unixTimeStamp).ToLocalTime();
        }

        //credits to Dmitry Fedorkov
        //reference http://stackoverflow.com/questions/249760/how-to-convert-a-unix-timestamp-to-datetime-and-vice-versa
        public static double DateTimeToUnixTimestamp(DateTime dateTime)
        {
            //Unix timestamp Is seconds past epoch
            return (dateTime.ToUniversalTime() - new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc)).TotalSeconds;
        }
    }
}

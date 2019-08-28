using System;

namespace Extensions.Date
{
    public static class TimeZones
    {
        /// <summary>
        /// retunds datetime in setted time zone
        /// </summary>
        /// <param name="SimulationTimeZone"></param>
        /// <param name="InputDate"></param>
        public static DateTime ReadNew(string SimulationTimeZone, DateTime InputDate)
        {
            TimeZoneInfo timeZone = TimeZoneInfo.FindSystemTimeZoneById(SimulationTimeZone);

            return TimeZoneInfo.ConvertTimeBySystemTimeZoneId(InputDate, TimeZoneInfo.Local.Id, timeZone.Id);
        }
    }
}

using System;
using System.Globalization;

namespace Extensions.Date
{
    public partial class Date
    {
        //creates new DateTime based on new datetime variable with year, month, day
        public static DateTime Create(int minute)
        {
            var zerodate = new DateTime();
            zerodate = zerodate.AddMinutes(minute);

            return zerodate;
        }

        //creates new DateTime based on new datetime variable with year, month, day
        public static DateTime Create(int year, int month, int day)
        {
            var zerodate = new DateTime();
            zerodate = zerodate.AddYears(year - 1).AddMonths(month - 1).AddDays(day - 1);

            return zerodate;
            //return new DateTime(zerodate.Year, zerodate.Month, zerodate.Day);
        }

        /// <summary>
        /// returns DateTime.DaysInMonth from new datetime variable base on year, month, day
        /// </summary>
        public static int DaysInMonth(int year, int month, int day)
        {
            var zerodate = new DateTime();
            zerodate = zerodate.AddYears(year - 1).AddMonths(month - 1).AddDays(day - 1);

            return DateTime.DaysInMonth(zerodate.Year, zerodate.Month);
        }


        public static int DaysInMonth(DateTime date)
        {
            return DateTime.DaysInMonth(date.Year, date.Month);
        }

        /// <summary>
        /// retunrs min date based on 2 dates
        /// </summary>
        public static DateTime Min(DateTime date1, DateTime date2)
        {
            if (date1 < date2)
                return date1;

            return date2;
        }

        /// <summary>
        /// retunrs min date based on 2 dates
        /// </summary>
        public static DateTime Max(DateTime date1, DateTime date2)
        {
            if (date1 > date2)
                return date1;

            return date2;
        }

        public static int GetWeeksInYear(int year)
        {
            DateTimeFormatInfo dfi = DateTimeFormatInfo.CurrentInfo;
            DateTime date1 = new DateTime(year, 12, 31);
            Calendar cal = dfi.Calendar;
            return cal.GetWeekOfYear(date1, dfi.CalendarWeekRule, dfi.FirstDayOfWeek);
        }


        /// <summary>
        /// creates datetime object based on 2 string
        /// date and time
        /// </summary>
        public static DateTime Create(string Date, string Time)
        {
            var values = Date.Split(new char[] { '/', '-', '.' });

            int year = Convert.ToInt32(values[2]);
            int month= Convert.ToInt32(values[0]);
            int day = Convert.ToInt32(values[1]);

            var date = new DateTime(year,month, day);

            //
            switch (Time.Length)
            {
                //4:55pm or 4:55am
                case 6:
                    Time = "0" + Time;
                    break;

                //4:55
                case 4:
                    Time = "0" + Time;
                    break;
            }

            var time = Convert.ToDateTime(Time);

            return date.AddHours(time.Hour).AddMinutes(time.Minute);
        }
    }
}

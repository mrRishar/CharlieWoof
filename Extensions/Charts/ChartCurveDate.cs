using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Charts
{
    public class ChartCurveDate : ChartCurve<DateTime, double>, IChart<DateTime, double>
    {
        /// <summary>
        /// contains list of flags of particular curve
        /// </summary>
        public List<IFlag<DateTime>> Flags { get; set; }

        ///public new string MakeChart()
        //{
        //    StringBuilder data11 = new StringBuilder();

        //    for (int i = this.Values.Count - 1; i >= 0; i--)
        //        data11.Append("[Date.UTC(" + this.Values[i].Item1.ToString("yyyy,MM,dd") + "), " + this.Values[i].Item2 + "],");

        //    data11.Remove(data11.Length - 1, 1);

        //    return data11.ToString();
        //}


        /// <summary>
        /// generated chart for higthstock in unix datetime 
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public new string MakeChart()
        {
            StringBuilder data11 = new StringBuilder();

            //ordering by date
            this.Values = this.Values.OrderBy(f => f.Item1).ToList();

            for (int i = 0; i < this.Values.Count; i++)
            {
                //Int32 unixTimestamp = (Int32)(data[i].Item1.Subtract(new DateTime(1970, 1, 1))).TotalSeconds;
                //[Date.UTC(1970, 9, 21), 0],
                data11.Append("[" + DateTimeToUnixTimestamp(this.Values[i].Item1) + "," + this.Values[i].Item2 + "],");
            }
            try
            {
                //remove comma
                data11.Remove(data11.Length - 1, 1);
            }
            catch { }
            return data11.ToString();
        }

        private static double DateTimeToUnixTimestamp(DateTime dateTime)
        {
            return (TimeZoneInfo.ConvertTimeToUtc(dateTime) - new DateTime(1970, 1, 1)).TotalMilliseconds;
        }
    }
}
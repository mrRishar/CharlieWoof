using System;
using System.Collections.Generic;
using System.Text;

namespace Charts
{
    public class ChartCurve<T1, T2> : IChart<T1, T2>
    {
        /// <summary>
        /// Represents the name of Line in chart
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Represents the name of XAsisName in chart
        /// </summary>
        public string XAsisName { get; set; }

        /// <summary>
        /// Represents the name of YAsisName in chart
        /// </summary>
        public string YAsisName { get; set; }

        public IList<Tuple<T1, T2>> Values { get; set; }

        /// <summary>
        /// returns the string for one line of date-time cart
        /// </summary>
        public string MakeChart()
        {
            StringBuilder data11 = new StringBuilder();

            for (int i = this.Values.Count - 1; i >= 0; i--)
                data11.Append("[" + this.Values[i].Item1 + ", " + this.Values[i].Item2 + "],");

            try
            {
                data11.Remove(data11.Length - 1, 1);
            }
            catch { }

            return data11.ToString();
        }

    }
}
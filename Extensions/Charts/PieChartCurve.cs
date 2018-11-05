using System;
using System.Collections.Generic;
using System.Text;

namespace Charts
{
    public class PieChart : IChart<string, double>
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

        public IList<Tuple<string, double>> Values { get; set; } = new List<Tuple<string, double>>();

        /// <summary>
        /// returns the string for one line of date-time cart
        /// </summary>
        public string MakeChart()
        {
            StringBuilder data11 = new StringBuilder();

            for (int i = this.Values.Count - 1; i >= 0; i--)
                data11.Append("{name: '" + this.Values[i].Item1 + "', y:" + this.Values[i].Item2 + "},");

            try
            {
                data11.Remove(data11.Length - 1, 1);
            }
            catch { }

            return data11.ToString();
        }

    }
}
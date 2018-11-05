using System;
using System.Linq;
using System.Text;

namespace Charts
{
    public class ChartCurveDateTime : ChartCurve<DateTime, double>, IChart<DateTime, double>
    {
        /// <summary>
        /// generated chart for higthstock in unix datetime 
        /// </summary>
        public new string MakeChart()
        {
            StringBuilder data11 = new StringBuilder();

            //ordering by date
            this.Values = this.Values.OrderBy(f => f.Item1).ToList();

            for (int i = 0; i < this.Values.Count; i++)
            {
                data11.Append("[Date.UTC(" + this.Values[i].Item1.AddMonths(-1).ToString("yyyy,MM,dd") + "), " + this.Values[i].Item2 + "],");
            }
            try
            {
                //remove comma
                data11.Remove(data11.Length - 1, 1);
            }
            catch { }
            return data11.ToString();
        }
    }
}
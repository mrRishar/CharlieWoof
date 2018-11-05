using System;
using System.Collections.Generic;

namespace Charts
{
    public interface IChart<T1, T2>
    {
        /// <summary>
        /// Represents the name of Line in chart
        /// </summary>
        string Name { get; set; }
        /// <summary>
        /// Represents the name of XAsisName in chart
        /// </summary>
        string XAsisName { get; set; }

        /// <summary>
        /// Represents the name of YAsisName in chart
        /// </summary>
        string YAsisName { get; set; }


        IList<Tuple<T1, T2>> Values { get; set; }

        /// <summary>
        /// returns the string for one line of date-time cart
        /// </summary>
        string MakeChart();
    }
}
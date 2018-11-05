using System.Collections.Generic;
using System.Linq;

namespace Charts
{
    public class Flags
    {
        /// <summary>
        /// returns sting for Chart from the list of curves in next example
        /// {x: Date.UTC(year, 1, 22),title: 'A',text: 'Shape: "squarepin"'}, 
        /// {x: Date.UTC(year, 3, 28),title: 'B',text: 'Shape 1: "squarepin"'}
        /// </summary>
        /// <param name="FlagList">List of Flags</param>
        public static string MyltiFlags<T>(List<IFlag<T>> FlagList)
        {
            return string.Join(",", FlagList.Select(f => f.Draw()));
        }
    }
}
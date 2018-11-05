using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace Extensions.EnumExtension
{
    public static partial class EnumExtensions
    {
        /// <summary>
        /// represents enum like dictionary list
        /// </summary>
        /// <typeparam name="TEnum">Enum type (Languages|Roles)</typeparam>
        /// <param name="type">the same asTEnum </param>
        public static Dictionary<string, int> ToDictionary<TEnum>(this Type type) where TEnum : struct, IComparable, IFormattable, IConvertible
        {
            return Enum.GetValues(type).OfType<TEnum>().ToDictionary(f => f.Description(), f => f.ToInt32(new DateTimeFormatInfo()));
        }
    }
}

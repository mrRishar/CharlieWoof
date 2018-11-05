using System;
using System.Collections.Generic;
using System.Linq;

namespace Extensions.EnumExtension
{
    public static partial class EnumExtensions
    {
        /// <summary>
        /// represents enum list
        /// </summary>
        /// <typeparam name="TEnum">Enum type (Languages|Roles)</typeparam>
        /// <param name="type">the same asTEnum </param>
        public static List<TEnum> ToList<TEnum>(this Type type) where TEnum : struct, IComparable, IFormattable, IConvertible
        {
            return Enum.GetValues(type).OfType<TEnum>().ToList();
        }
    }
}

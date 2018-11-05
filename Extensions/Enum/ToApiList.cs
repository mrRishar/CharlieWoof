using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace Extensions.EnumExtension
{
    public static partial class EnumExtensions
    {
        /// <summary>
        /// returns list of KeyValuePair <value of enum, description or name of enum>
        /// </summary>
        /// <typeparam name="TEnum"></typeparam>
        /// <param name="type"></param>
        /// <returns></returns>
        public static IEnumerable ToApiList<TEnum>(this Type type) where TEnum : struct, IComparable, IFormattable, IConvertible
        {
            return Enum.GetValues(type).OfType<TEnum>().Select(f => new { id = f.ToInt32(null), title = f.Description() });
        }
    }
}

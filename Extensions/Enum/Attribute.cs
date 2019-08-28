using System;
using System.ComponentModel;
using System.Reflection;

namespace Extensions.EnumExtension
{
    public static partial class EnumExtensions
    {
        /// <summary>
        /// custom attribute for enum witch be description in dictionary
        /// </summary>
        public static string Description<TEnum>(this TEnum @enum) where TEnum : struct, IComparable, IFormattable, IConvertible
        {
            try
            {
                //get enum name
                var @string = @enum.ToString();

                //try to read description attribute
                var attribute = @enum.GetType().GetField(@string).GetCustomAttribute<DescriptionAttribute>(false);

                //if we have desription return it. if not return enum name
                return attribute != null ? attribute.Description : @string;
            }
            catch // Log nothing, just return an empty string
            {
                return string.Empty;
            }
        }
    }
}

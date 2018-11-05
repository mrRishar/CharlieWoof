using System;
using System.Data;
using System.Collections.Generic;
using System.ComponentModel;

namespace Extensions.List
{
    public static partial class CollectionsExtensions
    {
        /// <summary>
        /// converts list of T items to data table
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="data"></param>
        /// <returns></returns>
        public static DataTable ToDataTable<T>(this IList<T> data)
        {
            PropertyDescriptorCollection properties = TypeDescriptor.GetProperties(typeof(T));
            DataTable table = new DataTable();

            //reading prop names
            foreach (PropertyDescriptor prop in properties)
                table.Columns.Add(prop.DisplayName, Nullable.GetUnderlyingType(prop.PropertyType) ?? prop.PropertyType);

            //reading values in rows
            foreach (T item in data)
            {
                DataRow row = table.NewRow();
                foreach (PropertyDescriptor prop in properties)
                    row[prop.DisplayName] = prop.GetValue(item) ?? DBNull.Value;
                table.Rows.Add(row);
            }
            return table;
        }


        public static DataTable ToDataTable(string[] header, List<string[]> value)
        {
            DataTable table = new DataTable();

            //reading prop names
            for (int i = 0; i < header.Length; i++)
                table.Columns.Add(header[i]);

            //reading values in rows
            foreach (var item in value)
            {
                DataRow row = table.NewRow();
                for (int i = 0; i < header.Length; i++)
                    row[i] = item[i];
                
                table.Rows.Add(row);
            }
            return table;
        }
    }
}
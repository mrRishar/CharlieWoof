using System;
using System.Collections.Generic;
using System.Data;

namespace Extensions.Excel
{
    public class ExcelDoc
    {
        public ExcelDoc()
        {
            Sheets = new List<ExcelSheet>();
        }

        public string FileName { get; set; }

        public List<ExcelSheet> Sheets { get; set; }
    }


    public class ExcelSheet
    {
        public ExcelSheet()
        {
            Blocks = new List<SheetBlock>();
        }

        public string Name { get; set; }

        /// <summary>
        /// list of blocks on the sheet
        /// </summary>
        public List<SheetBlock> Blocks { get; set; }
    }


    /// <summary>
    /// represents sheet block title, subtitle and table with data
    /// </summary>
    public class SheetBlock
    {
        public string Title { get; set; }
        public string SubTitle { get; set; }
        public DateTime Date { get; set; }
        public DataTable Data { get; set; }
        public int StartRow { get; set; }
        public int EndRow { get; set; }
    }
}
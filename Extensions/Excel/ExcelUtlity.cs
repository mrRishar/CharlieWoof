using System;
using System.Data;
using NPOI.HSSF.UserModel;
using NPOI.HSSF.Util;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;

namespace Extensions.Excel
{
    public class ExcelUtlity
    {
        /// <summary>
        /// FUNCTION FOR EXPORT TO EXCEL
        /// </summary>
        /// <param name="dataTable"></param>
        /// <param name="worksheetName"></param>
        /// <param name="saveAsLocation"></param>
        /// <returns></returns>
        public static IWorkbook WriteDataTableToExcel(ExcelDoc doc)
        {
            // Creation a new Workbook
            IWorkbook workbook = new XSSFWorkbook();

            foreach (var item in doc.Sheets)
            {
                // Work sheet
                ISheet excelSheet = workbook.CreateSheet(item.Name);

                int rowcount = 1;
                foreach (var block in item.Blocks)
                {
                    if (block.Data.Rows.Count > 0)
                    {
                        //new row count
                        rowcount = AddBlock(ref workbook, ref excelSheet, rowcount, block);
                    }
                }
            }

            //now save the workbook and exit Excel
            //workbook.SaveAs(doc.FileName);
            return workbook;
        }


        /// <summary>
        /// adds block to excel sheet using datatable
        /// </summary>
        /// <param name="excelSheet">excel sheet we wanna edit</param>
        /// <param name="StartFormRow">Number of row we will add new content</param>
        /// <param name="dataTable">new content</param>
        ///<returns>last row number</returns>
        private static int AddBlock(ref IWorkbook workbook, ref ISheet excelSheet, int StartFormRow, SheetBlock block)
        {
            int rowcount = StartFormRow;

            IRow row = excelSheet.CreateRow(rowcount);
            row.CreateCell(0).SetCellValue(block.Title);
            row.CreateCell(1).SetCellValue("Date : " + DateTime.Now.ToShortDateString());
            rowcount++;

            foreach (DataRow datarow in block.Data.Rows)
            {
                rowcount++;

                IRow headerRow;
                IRow contentRow;
                if (rowcount == StartFormRow + 2)
                {
                    headerRow = excelSheet.CreateRow(rowcount);
                    contentRow = excelSheet.CreateRow(rowcount + 1);
                    rowcount++;
                }
                else
                {
                    headerRow = null;
                    contentRow = excelSheet.CreateRow(rowcount);
                }

                for (int i = 0; i < block.Data.Columns.Count; i++)
                {
                    // on the first iteration we add the column headers
                    if (headerRow != null)
                    {
                        var hFont = workbook.CreateFont();
                        hFont.Boldweight = (short)FontBoldWeight.Bold;
                        hFont.Color = HSSFColor.White.Index;

                        var hStyle = workbook.CreateCellStyle();
                        hStyle.FillPattern = FillPattern.AltBars;
                        hStyle.FillBackgroundColor = HSSFColor.Grey50Percent.Index;
                        hStyle.SetFont(hFont);

                        var cell = headerRow.CreateCell(i);
                        cell.SetCellValue(block.Data.Columns[i].ColumnName);
                        cell.CellStyle = hStyle;
                    }

                    var cell1 = contentRow.CreateCell(i);

                    if (rowcount % 2 == 0)
                    {
                        var hStyle = workbook.CreateCellStyle();
                        hStyle.FillPattern = FillPattern.LeastDots;
                        hStyle.FillForegroundColor= HSSFColor.LightBlue.Index;

                        cell1.SetCellValue(block.Data.Columns[i].ColumnName);
                        cell1.CellStyle = hStyle;
                    }

                    cell1.SetCellValue(datarow[i].ToString());
                }



                for (int i = 0; i < block.Data.Columns.Count; i++)
                {
                    //auto size column
                    excelSheet.AutoSizeColumn(i);
                }
            }

            return rowcount + 3;
        }
    }
}
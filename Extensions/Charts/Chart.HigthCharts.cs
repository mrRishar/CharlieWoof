using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Charts
{
    public static class Chart
    {
        /// <summary>
        /// concats strings from array in one string spliting comma sign ,
        /// </summary>
        /// <param name="array"></param>
        /// <param name="round">math.round or not</param>
        public static string StringConcat<T>(T[] array, bool round = false) where T : IEnumerable
        {
            StringBuilder plot = new StringBuilder();

            //то буде виконувати портфоліо разів. (скільки портфоліо стільки і разів)
            for (int i = 0; i < array.Count(); i++)
            {
                if (round)
                    plot.Append(Math.Round(Convert.ToDouble(array[i]), 1).ToString() + ",");  //додаємо стрічки через кому
                else
                    plot.Append(array[i].ToString() + ",");  //додаємо стрічки через кому
            }

            try
            {
                //видалення останньої коми у виводі
                plot.Remove(plot.Length - 1, 1);
            }
            catch { }

            return plot.ToString();
        }


        /// <summary>
        ///Draws a few lines in one chart.
        /// </summary>
        public static string MyltiArea<T1, T2>(List<IChart<T1, T2>> Curves, bool animation = true)
        {
            string plot = "";
            string animationText = "";
            if (!animation)
                animationText = " animation:false,";

            //то буде виконувати портфоліо разів. (скільки портфоліо стільки і разів)
            for (int i = 0; i < Curves.Count(); i++)
            {
                //                           !     назва портфоліо   !       !  дату беремо з функції ПЛОТ, вона генерує стрічку даних для X та Y    !
                plot += " {type:'area'," + animationText + " name:'" + Curves[i].Name + "', data:[" + Curves[i].MakeChart() + " ]}, ";
                //Plot(PortfolioGrouth[i].Values) - видає результат для однієї вітки, в форматі дани та значення. для графіка, що підтримує зум
            }

            try
            {
                //видалення останньої коми у виводі
                plot.Remove(plot.Length - 1);
            }
            catch { }
            return plot;
        }

        public static string MyltiColumn(List<IChart<DateTime, double>> Curves, bool animation = true)
        {
            string plot = "";
            string animationText = "";
            if (!animation)
                animationText = " animation:false,";

            //то буде виконувати портфоліо разів. (скільки портфоліо стільки і разів)
            for (int i = 0; i < Curves.Count(); i++)
            {
                //                           !     назва портфоліо   !       !  дату беремо з функції ПЛОТ, вона генерує стрічку даних для X та Y    !
                plot += " {type:'column'," + animationText + " name:'" + Curves[i].Name + "', data:[" + Curves[i].MakeChart() + " ]}, ";
                //Plot(PortfolioGrouth[i].Values) - видає результат для однієї вітки, в форматі дани та значення. для графіка, що підтримує зум
            }

            try
            {
                //видалення останньої коми у виводі
                plot.Remove(plot.Length - 1);
            }
            catch { }

            return plot;
        }


        /// <summary>
        /// returns sting for Chart from the list of curves in next example
        /// {name:[puts name of curve from the list], data: [ puts the data from Values dictionary for each curve from the list ] }
        /// {name: 'curve 1', data: [[1,3.6],[2,5.34],[6,3.4] ]} - line like this will be generreted for each curve
        /// </summary>
        /// <param name="Curves">List of curves</param>
        public static string MyltiCurves<T1, T2>(List<IChart<T1, T2>> Curves)
        {
            StringBuilder plot = new StringBuilder();

            //draw {name:[curve name], data: [data from values] }
            for (int i = 0; i < Curves.Count(); i++)
            {
                if (Curves[i].Values.Count > 0)
                    plot.Append(" { name:'" + Curves[i].Name + "', data:[" + Curves[i].MakeChart() + " ]},");
            }

            try
            {
                //removing last comma sign
                plot.Remove(plot.Length - 1, 1);
            }
            catch { }

            return plot.ToString();
        }


        public static string MyltiCurvesForCategoriesChart<T1, T2>(List<IChart<T1, T2>> Curves)
        {
            StringBuilder plot = new StringBuilder();

            //draw {name:[curve name], data: [data from values] }
            for (int i = 0; i < Curves.Count(); i++)
                plot.Append(" { name:'" + Curves[i].Name + "', data:[" + string.Join(",", Curves[i].Values.Select(f => f.Item2).ToArray()) + " ]},");

            try
            {
                //removing last comma sign
                plot.Remove(plot.Length - 1, 1);
            }
            catch { }

            return plot.ToString();
        }
    }
}
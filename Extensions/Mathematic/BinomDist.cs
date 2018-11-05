
using MathNet.Numerics.Distributions;

namespace Extensions.Mathematic
{
    public partial class Mathematic
    {
        public static double BinomDist(double number_s, double trials, double probability_s, bool cumulative)
        {
            try
            {
                return Binomial.CDF(probability_s, (int)trials, number_s);
            }
            catch
            {
                return 0;
            }
        }
    }
}

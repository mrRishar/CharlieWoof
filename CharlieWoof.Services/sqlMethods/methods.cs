using System;

namespace CharlieWoof.Services.sqlMethods
{
    class SqlMethods
    {
        public static double callDelta(double S, double K, double r, double sigma, double T)
        {
            return cumNorm(d1(S, K, r, sigma, T));
        }

        private static double d1(double S, double K, double r, double sigma, double T)
        {
            return (Math.Log10(S / K) + (r + sigma * sigma / 2) * T) / (sigma * Math.Sqrt(T));
        }

        public static double cumNorm(double x)
        {
            return x <= 0 ? 0.5 - halfCumNorm(-1 * x)
                          : 0.5 + halfCumNorm(x);
        }

        static double halfCumNorm(double x)
        {
            return 0.5 * Math.Sqrt(1 - (1 / 30) * (7 * Math.Exp(-x * x / 2) + 16 * Math.Exp(-x * x * (2 - Math.Sqrt(2))) + (7 + 0.25 * x * x * 3.1415) * Math.Exp(-x * x)));
        }

        public static double putDelta(double S, double K, double r, double sigma, double T)
        {
            return callDelta(S, K, r, sigma, T) - 1;
        }
    }
}
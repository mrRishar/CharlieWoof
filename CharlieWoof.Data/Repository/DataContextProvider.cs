using CharlieWoof.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace CharlieWoof.Data.Repository
{
    /// <summary>
    /// This class is buffer class between DbContext and our EntityBaseRepository
    /// </summary>
    public sealed class DataContextProvider : CWDataContext
    {
        public DataContextProvider(DbContextOptions<CWDataContext> options) : base(options)
        {}
    }
}
using CharlieWoof.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Xunit;

namespace CharliWoof.DataContext.DataSeeds
{
    public class Run
    {
        [Fact]
        public void WriteDataToDb()
        {
            DbContextOptionsBuilder builder = new DbContextOptionsBuilder(new DbContextOptions<CWDataContext>());
            builder.UseSqlServer("Data Source=(localdb)\\mssqllocaldb;initial catalog=CWDataBase;Integrated Security=True;Connect Timeout=30;Max Pool Size=1024;");

            DbContextOptions<CWDataContext> options = (DbContextOptions<CWDataContext>)builder.Options;

            var db = new CharlieWoof.Data.Models.CWDataContext(options);

            if (!db.Users.Any())
                new CharlieWoof.Data.DataSeeds.CreateDatabaseIfNotExists(db).WriteInitialData();
        }
    }
}

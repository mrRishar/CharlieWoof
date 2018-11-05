namespace CW.DataContext.DataSeeds
{
    public class Run
    {
        [Fact]
        public void WriteDataToDb()
        {
            DbContextOptionsBuilder builder = new DbContextOptionsBuilder(new DbContextOptions<ICTDataContext>());
            builder.UseSqlServer("Data Source=DESKTOP-V9O3IH2;initial catalog=ICTrader;Integrated Security=True;Connect Timeout=30;Max Pool Size=1024;");

            DbContextOptions<ICTDataContext> options = (DbContextOptions<ICTDataContext>)builder.Options;

            var db = new DataContext.Models.ICTDataContext(options);

            if (!db.Users.Any())
                new DataSeeds.CreateDatabaseIfNotExists(db).WriteInitialData();
        }
    }
}

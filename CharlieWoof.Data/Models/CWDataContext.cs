using CharlieWoof.Core.Models;
using CharlieWoof.Core.Models.MagicPackage;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace CharlieWoof.Data.Models
{
    public class CWDataContext : DbContext
    {
        public CWDataContext(DbContextOptions<CWDataContext> options)
            : base(options)
        {
        }

        public DbSet<Setting> Settings { get; set; }
        public DbSet<User> Users { get; set; }

        public DbSet<MagicFile> MagicFiles { get; set; }
        public DbSet<MagicPage> MagicPages { get; set; }
        public DbSet<HistoricalMagicPage> HistoricalMagicPages { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Setting>(entity =>
            {
                entity.Property(e => e.CreatedOnUtc).HasColumnType("datetime");
                entity.Property(e => e.UpdatedOnUtc).HasColumnType("datetime");

                entity.Property(e => e.Description)
                      .IsRequired()
                      .HasMaxLength(250);
            });


            modelBuilder.Entity<User>(entity =>
            {
                entity.Ignore(b => b.IsOnline);

                entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
                entity.Property(e => e.CreatedOnUtc).HasColumnType("datetime");
                entity.Property(e => e.UpdatedOnUtc).HasColumnType("datetime");
                entity.HasIndex(e => e.UpdatedByUserId);

                entity.Property(e => e.Role).HasColumnType("tinyint");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.Firstname)
                    .IsRequired()
                    .HasMaxLength(250);

            });


            #region magic package


            modelBuilder.Entity<HistoricalMagicPage>(entity =>
            {
                entity.HasIndex(e => e.MagicPageId);

                entity.HasIndex(e => e.UpdatedByUserId);

                entity.Property(e => e.Id).HasDefaultValueSql("(newid())");

                entity.Property(e => e.Content).IsRequired();

                entity.Property(e => e.CreatedOnUtc).HasColumnType("datetime");

                entity.Property(e => e.Description).IsRequired();

                entity.Property(e => e.Type)
                      .HasColumnType("tinyint");

                entity.Property(e => e.SeoDescription)
                      .IsRequired()
                      .HasMaxLength(500);

                entity.Property(e => e.SeoTitle)
                      .IsRequired()
                      .HasMaxLength(250);

                entity.Property(e => e.Title)
                      .IsRequired()
                      .HasMaxLength(250);

                entity.Property(e => e.UpdatedOnUtc).HasColumnType("datetime");

                entity.Property(e => e.Url)
                      .IsRequired()
                      .HasMaxLength(500);

                entity.HasOne(d => d.MagicPage)
                      .WithMany(p => p.HistoricalMagicPages)
                      .HasForeignKey(d => d.MagicPageId)
                      .OnDelete(DeleteBehavior.ClientSetNull)
                      .HasConstraintName("FK_HistoricalMagicPages_MagicPages");
            });


            modelBuilder.Entity<MagicFile>(entity =>
            {
                entity.HasIndex(e => e.UpdatedByUserId);

                entity.Property(e => e.Id).HasDefaultValueSql("(newid())");

                entity.Property(e => e.CreatedOnUtc).HasColumnType("datetime");

                entity.Property(e => e.Type)
                      .HasColumnType("tinyint");

                entity.Property(e => e.FileName)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.UpdatedOnUtc).HasColumnType("datetime");
            });



            modelBuilder.Entity<MagicPage>(entity =>
            {
                entity.HasIndex(e => e.UpdatedByUserId);

                entity.Property(e => e.Id).HasDefaultValueSql("(newid())");

                entity.Property(e => e.Content).IsRequired();

                entity.Property(e => e.CreatedOnUtc).HasColumnType("datetime");

                entity.Property(e => e.Description).IsRequired();

                entity.Property(e => e.Type)
                      .HasColumnType("tinyint");

                entity.Property(e => e.SeoDescription)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.SeoTitle)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.UpdatedOnUtc).HasColumnType("datetime");

                entity.Property(e => e.Url)
                    .IsRequired()
                    .HasMaxLength(500);
            });

            #endregion  

        }
    }
}
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
        public DbSet<MagicContentItem> MagicContentItems { get; set; }
        public DbSet<Pet> Pets { get; set; }
        public DbSet<Order> Orders { get; set; }

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

                entity.Property(e => e.SeoKeywords)
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

                entity.Property(e => e.SeoKeywords)
                    .IsRequired()
                    .HasMaxLength(250);
                entity.Property(e => e.SortNumder)
                   .IsRequired();
            });

            modelBuilder.Entity<MagicContentItem>(entity =>
            {
                entity.HasIndex(e => e.UpdatedByUserId);

                entity.Property(e => e.Id).HasDefaultValueSql("(newid())");

                entity.Property(e => e.Content).IsRequired();

                entity.Property(e => e.CreatedOnUtc).HasColumnType("datetime");

                entity.Property(e => e.Description).IsRequired();

                entity.Property(e => e.Icon)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.Image)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.UpdatedOnUtc).HasColumnType("datetime");

                entity.Property(e => e.Css)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.Color)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.MagicPageId)
                    .IsRequired();

                entity.Property(e => e.SortNumder)
                  .IsRequired();
            });

            modelBuilder.Entity<Pet>(entity =>
            {
                entity.HasIndex(e => e.UpdatedByUserId);

                entity.Property(e => e.Id).HasDefaultValueSql("(newid())");

                entity.Property(e => e.Name).IsRequired();

                entity.Property(e => e.CreatedOnUtc).HasColumnType("datetime");

                entity.Property(e => e.Note).IsRequired();

                entity.Property(e => e.Image)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.Birthday).HasColumnType("datetime");

                entity.Property(e => e.Breed)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.UpdatedOnUtc).HasColumnType("datetime");

                entity.Property(e => e.OwnerUserId)
                    .IsRequired();
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasIndex(e => e.UpdatedByUserId);

                entity.Property(e => e.Id).HasDefaultValueSql("(newid())");

                entity.Property(e => e.Note).IsRequired();

                entity.Property(e => e.CreatedOnUtc).HasColumnType("datetime");

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.Price)
                    .IsRequired();

                entity.Property(e => e.Services)
                      .HasColumnType("tinyint");

                entity.Property(e => e.Status)
                     .HasColumnType("tinyint");

                entity.Property(e => e.UpdatedOnUtc).HasColumnType("datetime");

                entity.Property(e => e.UserId)
                    .IsRequired();
            });
            #endregion  
        }
    }
}
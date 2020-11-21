using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace HackApi
{
    public partial class HackathonContext : DbContext
    {
        public HackathonContext()
        {
        }

        public HackathonContext(DbContextOptions<HackathonContext> options)
            : base(options)
        {
        }

        public virtual DbSet<MrkApiToken> MrkApiToken { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=94.23.91.119;Initial Catalog=Hackathon; User Id=mnogaj;Password=kajak13");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MrkApiToken>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.Token)
                    .IsRequired()
                    .HasColumnType("text");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}

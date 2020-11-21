using Microsoft.EntityFrameworkCore;

namespace HackApi.Database
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

        public virtual DbSet<CheckpointAnswer> CheckpointAnswer { get; set; }
        public virtual DbSet<CheckpointType> CheckpointType { get; set; }
        public virtual DbSet<Checkpoints> Checkpoints { get; set; }
        public virtual DbSet<Meetings> Meetings { get; set; }
        public virtual DbSet<MrkApiToken> MrkApiToken { get; set; }
        public virtual DbSet<MrkApiTokenStudent> MrkApiTokenStudent { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=94.23.91.119;Database=Hackathon;User Id=oszymanski;Password=oskar");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CheckpointAnswer>(entity =>
            {
                entity.Property(e => e.CheckpointAnswerBody)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.UserMail)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<CheckpointType>(entity =>
            {
                entity.Property(e => e.CheckpointTypeId).ValueGeneratedNever();

                entity.Property(e => e.CheckpointTypeName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Checkpoints>(entity =>
            {
                entity.HasKey(e => e.CheckpointId)
                    .HasName("PK__Checkpoi__6C00DFE2092DDC04");

                entity.Property(e => e.CheckpointAnswerOptions)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.CheckpointTitle)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.MeetingId)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.HasOne(d => d.CheckpointAnswer)
                    .WithMany(p => p.Checkpoints)
                    .HasForeignKey(d => d.CheckpointAnswerId)
                    .HasConstraintName("PK_CheckpointAnswerId_Checkpoints");

                entity.HasOne(d => d.CheckpointType)
                    .WithMany(p => p.Checkpoints)
                    .HasForeignKey(d => d.CheckpointTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("PK_CheckpointTypeId_CheckpointType");

                entity.HasOne(d => d.Meeting)
                    .WithMany(p => p.Checkpoints)
                    .HasForeignKey(d => d.MeetingId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("PK_MeetingId_Meetings");
            });

            modelBuilder.Entity<Meetings>(entity =>
            {
                entity.HasKey(e => e.MeetingId)
                    .HasName("PK__Meetings__E9F9E94C197728D8");

                entity.Property(e => e.MeetingId)
                    .HasMaxLength(500)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<MrkApiToken>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.Token)
                    .IsRequired()
                    .HasColumnType("text");
            });

            modelBuilder.Entity<MrkApiTokenStudent>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.Token).HasColumnType("text");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}

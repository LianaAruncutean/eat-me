using Eat_Me.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eat_Me
{
    public class AppDbContext : DbContext
    {
        public DbSet<Food> Food { get; set; }
        public DbSet<UserFood> UserFood { get; set; }
        public DbSet<BlogEntity> Blog { get; set; }
        public DbSet<UserDetails> UserDetails { get; set; }
        public DbSet<UserRetrospective> UserRetrospective { get; set; }

        public DbSet<AddUserFood> AddUserFood { get; set; }
        public DbSet<AddFood> AddFood { get; set; }
        public DbSet<DeleteFood> DeleteFood { get; set; }
        public DbSet<EditLikes> EditLikes { get; set; }
        public DbSet<AddComment> AddComment { get; set; }
        public AppDbContext(string connectionString) : base(SqlServerDbContextOptionsExtensions.UseSqlServer(new DbContextOptionsBuilder(), connectionString, builder =>
        {
            builder.EnableRetryOnFailure(maxRetryCount: 5, maxRetryDelay: System.TimeSpan.FromSeconds(5), null);
        }).Options)
        { }

        public AppDbContext(DbContextOptions builder) : base(builder) { }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Food>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Name).IsRequired();
                entity.Property(e => e.Calories).IsRequired();
                //entity.Property(e => e.Category).IsRequired();
                entity.Property(e => e.ImageURL).IsRequired(false);
            });

            modelBuilder.Entity<UserFood>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.Name).IsRequired();
                entity.Property(e => e.Calories).IsRequired();
                entity.Property(e => e.FoodId).IsRequired();
            });

            modelBuilder.Entity<AddUserFood>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.UserId).IsRequired();
                entity.Property(e => e.FoodId).IsRequired();
                entity.Property(e => e.Quantity).IsRequired();
            });

            modelBuilder.Entity<AddFood>(entity =>
            {
                entity.Property(e => e.Name).IsRequired();
                entity.Property(e => e.Calories).IsRequired();
                entity.Property(e => e.ImageURL).IsRequired(false);
            });

            modelBuilder.Entity<DeleteFood>(entity =>
            {
                entity.HasKey(e => e.FoodName);

                entity.Property(e => e.FoodName).IsRequired();
            });

            modelBuilder.Entity<BlogEntity>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.BlogId).IsRequired();
                entity.Property(e => e.Title).IsRequired();
                entity.Property(e => e.Text).IsRequired();
                entity.Property(e => e.Likes).IsRequired();
                entity.Property(e => e.ImageURL).IsRequired(false);
                entity.Property(e => e.IsLiked).IsRequired();
                entity.Property(e => e.CommentId).IsRequired(false);
                entity.Property(e => e.Comment).IsRequired(false);
                entity.Property(e => e.FirstName).IsRequired(false);
                entity.Property(e => e.LastName).IsRequired(false);
            });

            modelBuilder.Entity<EditLikes>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.BlogId).IsRequired();
                entity.Property(e => e.UserId).IsRequired();
                entity.Property(e => e.NrOfLikes).IsRequired();
            });

            modelBuilder.Entity<UserDetails>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.UserId).IsRequired(false);
                entity.Property(e => e.FirstName).IsRequired(false);
                entity.Property(e => e.LastName).IsRequired(false);
                entity.Property(e => e.Calories).IsRequired(false);
                entity.Property(e => e.IsAdmin).IsRequired(false);
            });

            modelBuilder.Entity<AddComment>(entity =>
            {
                entity.HasKey(e => e.CommentId);

                entity.Property(e => e.CommentId).IsRequired();
                entity.Property(e => e.UserId).IsRequired();
                entity.Property(e => e.BlogId).IsRequired();
                entity.Property(e => e.Comment).IsRequired();
            });

            modelBuilder.Entity<UserRetrospective>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.FoodId).IsRequired();
                entity.Property(e => e.Name).IsRequired();
                entity.Property(e => e.Calories).IsRequired();
                entity.Property(e => e.Day).IsRequired();
                entity.Property(e => e.DayOfWeek).IsRequired();
            });
        }
    }
}

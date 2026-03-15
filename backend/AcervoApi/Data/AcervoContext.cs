using AcervoApi.Models;
using Microsoft.EntityFrameworkCore;

namespace AcervoApi.Data
{
    public class AcervoContext : DbContext
    {
        public AcervoContext(DbContextOptions<AcervoContext> options) : base(options)
        {
        }

        public DbSet<Livro> Livros { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Livro>().ToTable("AcervoLivros");
        }
    }
}

using AcervoApi.Data;
using AcervoApi.Interfaces;
using AcervoApi.Models;
using Microsoft.EntityFrameworkCore;

namespace AcervoApi.Repositories
{
    public class LivroRepository : ILivroRepository
    {
        private readonly AcervoContext _context;

        public LivroRepository(AcervoContext context)
        {
            _context = context;
        }

        public async Task<Livro> AddAsync(Livro livro)
        {
            livro.DataCadastro = DateTime.UtcNow;
            _context.Livros.Add(livro);
            await _context.SaveChangesAsync();
            return livro;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var livro = await _context.Livros.FindAsync(id);
            if (livro == null) return false;
            _context.Livros.Remove(livro);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Livro>> GetAllAsync()
        {
            return await _context.Livros.AsNoTracking().ToListAsync();
        }

        public async Task<Livro?> GetByIdAsync(int id)
        {
            return await _context.Livros.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<bool> UpdateAsync(Livro livro)
        {
            var exists = await _context.Livros.AnyAsync(x => x.Id == livro.Id);
            if (!exists) return false;
            _context.Livros.Update(livro);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}

using AcervoApi.Models;

namespace AcervoApi.Interfaces
{
    public interface ILivroRepository
    {
        Task<IEnumerable<Livro>> GetAllAsync();
        Task<Livro?> GetByIdAsync(int id);
        Task<Livro> AddAsync(Livro livro);
        Task<bool> UpdateAsync(Livro livro);
        Task<bool> DeleteAsync(int id);
    }
}

using AcervoApi.Models;

namespace AcervoApi.Interfaces
{
    public interface ILivroService
    {
        Task<IEnumerable<Livro>> GetAllAsync();
        Task<Livro?> GetByIdAsync(int id);
        Task<Livro> CreateAsync(Livro livro);
        Task<bool> UpdateAsync(int id, Livro livro);
        Task<bool> DeleteAsync(int id);
    }
}

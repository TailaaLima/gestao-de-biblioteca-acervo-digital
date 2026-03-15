using AcervoApi.Interfaces;
using AcervoApi.Models;

namespace AcervoApi.Services
{
    public class LivroService : ILivroService
    {
        private readonly ILivroRepository _repository;

        public LivroService(ILivroRepository repository)
        {
            _repository = repository;
        }

        public Task<Livro> CreateAsync(Livro livro)
        {
            return _repository.AddAsync(livro);
        }

        public Task<bool> DeleteAsync(int id)
        {
            return _repository.DeleteAsync(id);
        }

        public Task<IEnumerable<Livro>> GetAllAsync()
        {
            return _repository.GetAllAsync();
        }

        public Task<Livro?> GetByIdAsync(int id)
        {
            return _repository.GetByIdAsync(id);
        }

        public async Task<bool> UpdateAsync(int id, Livro livro)
        {
            if (id != livro.Id) return false;
            return await _repository.UpdateAsync(livro);
        }
    }
}

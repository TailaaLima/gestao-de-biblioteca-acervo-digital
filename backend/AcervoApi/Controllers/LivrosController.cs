using AcervoApi.Interfaces;
using AcervoApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace AcervoApi.Controllers
{
    [ApiController]
    [Route("api/CadastrarLivro")]
    public class LivrosController : ControllerBase
    {
        private readonly ILivroService _livroService;

        public LivrosController(ILivroService livroService)
        {
            _livroService = livroService;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Livro livro)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var created = await _livroService.CreateAsync(livro);
            return CreatedAtAction(nameof(Create), new { id = created.Id }, created);
        }

        [HttpGet]
        [Route("/api/Livros")]
        public async Task<IActionResult> GetAll()
        {
            var livros = await _livroService.GetAllAsync();
            return Ok(livros);
        }

        [HttpGet]
        [Route("/api/Livros/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var livro = await _livroService.GetByIdAsync(id);
            if (livro == null) return NotFound();
            return Ok(livro);
        }

        [HttpPut]
        [Route("/api/Livros/{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Livro livro)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (id != livro.Id) return BadRequest("O ID do livro na rota deve corresponder ao ID do corpo da requisição.");

            var updated = await _livroService.UpdateAsync(id, livro);
            if (!updated) return NotFound();

            return NoContent();
        }
    }
}

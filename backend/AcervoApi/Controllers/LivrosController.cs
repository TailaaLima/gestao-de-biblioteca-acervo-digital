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
    }
}

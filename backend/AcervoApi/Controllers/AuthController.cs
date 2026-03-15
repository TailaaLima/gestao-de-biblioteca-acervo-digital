using Microsoft.AspNetCore.Mvc;

namespace AcervoApi.Controllers
{
    public class LoginRequest
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
                return BadRequest("Usuário e senha são obrigatórios");

            // Mock login temporário
            if (request.Username == "admin" && request.Password == "1234")
                return Ok(new { token = "fake-jwt-token", username = request.Username });

            return Unauthorized("Usuário ou senha inválidos");
        }
    }
}

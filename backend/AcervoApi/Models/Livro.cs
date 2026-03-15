using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AcervoApi.Models
{
    [Table("AcervoLivros")]
    public class Livro
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Titulo { get; set; } = string.Empty;

        [Required]
        [MaxLength(150)]
        public string Autor { get; set; } = string.Empty;

        [MaxLength(100)]
        public string? Genero { get; set; }

        public int AnoPublicacao { get; set; }

        [MaxLength(2000)]
        public string? Sinopse { get; set; }

        public DateTime DataCadastro { get; set; }
    }
}

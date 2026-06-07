import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api';

export default function AcervoPage() {
  const [livros, setLivros] = useState([]);
  const [error, setError] = useState('');
  const [livroParaExcluir, setLivroParaExcluir] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    const fetchLivros = async () => {
      try {
        const response = await api.get('/Livros');
        setLivros(response.data);
      } catch (err) {
        setError('Erro ao buscar livros: ' + (err.response?.data?.message || err.message));
      }
    };

    fetchLivros();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
  };

  const abrirConfirmacaoExclusao = (livro) => {
    setLivroParaExcluir(livro);
    setError('');
  };

  const fecharConfirmacaoExclusao = () => {
    setLivroParaExcluir(null);
  };

  const handleDelete = async () => {
    if (!livroParaExcluir) return;

    setIsDeleting(true);
    try {
      await api.delete(`/Livros/${livroParaExcluir.id}`);
      setLivros((prev) => prev.filter((livro) => livro.id !== livroParaExcluir.id));
      fecharConfirmacaoExclusao();
    } catch (err) {
      setError('Erro ao excluir livro: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <section className="page list-page">
      <div className="top-row">
        <div>
          <h1>Acervo Digital Biblioteca</h1>
          <p>Olá, {localStorage.getItem('username') || 'Usuário'}!</p>
        </div>

        <div className="actions">
          <Link to="/dashboard" className="btn secondary">← Voltar</Link>
          <button className="btn danger" onClick={handleLogout}>Sair</button>
        </div>
      </div>

      {error && <p className="error">{error}</p>}

      {livroParaExcluir && (
        <div className="modal-overlay" onClick={fecharConfirmacaoExclusao}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h2>Excluir livro</h2>
            <p>
              Tem certeza que deseja excluir <strong>{livroParaExcluir.titulo}</strong>?
              <br />
              Esta ação não poderá ser desfeita.
            </p>
            <div className="modal-actions">
              <button className="btn secondary" onClick={fecharConfirmacaoExclusao} disabled={isDeleting}>
                Cancelar
              </button>
              <button className="btn danger" onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? 'Excluindo...' : 'Excluir'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="book-list">
        {livros.length === 0 && <p>Nenhum livro cadastrado.</p>}
        {livros.map((livro) => (
          <article key={livro.id} className="card">
            <h3>{livro.titulo}</h3>
            <p>{livro.autor} - {livro.anoPublicacao}</p>
            <p>{livro.genero}</p>
            <p>{livro.sinopse}</p>
            <div className="card-actions">
              <button className="btn secondary" onClick={() => navigate(`/editar-livro/${livro.id}`)}>
                Editar
              </button>
              <button className="btn danger" onClick={() => abrirConfirmacaoExclusao(livro)}>
                Excluir
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

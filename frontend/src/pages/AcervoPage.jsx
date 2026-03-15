import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api';

export default function AcervoPage() {
  const [livros, setLivros] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    setError('A pasta de listagem de livros está desativada no modo cadastro único.');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <section className="page list-page">
      <div className="top-row">
        <div>
          <h1>Acervo Digital Biblioteca</h1>
          <p>Olá, {localStorage.getItem('username') || 'Usuário'}!</p>
        </div>

        <div className="actions">
          <Link to="/cadastro-livro" className="btn secondary">Cadastrar livro</Link>
          <button className="btn danger" onClick={handleLogout}>Sair</button>
        </div>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="book-list">
        {livros.length === 0 && <p>Nenhum livro cadastrado.</p>}
        {livros.map((livro) => (
          <article key={livro.id} className="card">
            <h3>{livro.titulo}</h3>
            <p>{livro.autor} - {livro.anoPublicacao}</p>
            <p>{livro.genero}</p>
            <p>{livro.sinopse}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

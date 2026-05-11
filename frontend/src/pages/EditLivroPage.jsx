import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../api';

export default function EditLivroPage() {
  const { id } = useParams();
  const [form, setForm] = useState({ titulo: '', autor: '', genero: '', anoPublicacao: '', sinopse: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
      return;
    }

    const fetchLivro = async () => {
      try {
        const response = await api.get(`/Livros/${id}`);
        const livro = response.data;
        setForm({
          titulo: livro.titulo || '',
          autor: livro.autor || '',
          genero: livro.genero || '',
          anoPublicacao: livro.anoPublicacao?.toString() || '',
          sinopse: livro.sinopse || '',
        });
      } catch (err) {
        setError('Não foi possível carregar o livro.');
      } finally {
        setLoading(false);
      }
    };

    fetchLivro();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await api.put(`/Livros/${id}`, {
        id: Number(id),
        ...form,
        anoPublicacao: Number(form.anoPublicacao),
      });
      setMessage('Livro atualizado com sucesso!');
    } catch (err) {
      setError('Falha ao atualizar livro. Verifique os dados e tente novamente.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
  };

  if (!localStorage.getItem('token')) {
    return null;
  }

  return (
    <section className="page cadastro-page">
      <div className="top-row">
        <div>
          <h1>Editar Livro</h1>
          <p className="subtitle">Atualize as informações do livro cadastrado.</p>
        </div>
        <div className="actions">
          <button className="btn secondary" onClick={() => navigate('/acervo')}>← Voltar</button>
          <button className="btn danger" onClick={handleLogout}>Sair</button>
        </div>
      </div>

      {loading ? (
        <p>Carregando livro...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <form onSubmit={handleSubmit} className="book-form">
          <input name="titulo" value={form.titulo} onChange={handleChange} placeholder="Título" required />
          <input name="autor" value={form.autor} onChange={handleChange} placeholder="Autor" required />
          <input name="genero" value={form.genero} onChange={handleChange} placeholder="Gênero" />
          <input name="anoPublicacao" value={form.anoPublicacao} onChange={handleChange} placeholder="Ano" type="number" min="1000" max="2100" />
          <textarea name="sinopse" value={form.sinopse} onChange={handleChange} placeholder="Sinopse" rows="4" />
          <button type="submit" className="btn primary">Salvar alterações</button>
        </form>
      )}

      {message && <p className="info">{message}</p>}
    </section>
  );
}

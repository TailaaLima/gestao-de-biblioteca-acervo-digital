import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

export default function CadastroLivroPage() {
  const [form, setForm] = useState({ titulo: '', autor: '', genero: '', anoPublicacao: '', sinopse: '' });
  const [message, setMessage] = useState('');
  const [cadastroConcluido, setCadastroConcluido] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const payload = {
        ...form,
        anoPublicacao: Number(form.anoPublicacao),
      };
      await api.post('/CadastrarLivro', payload);
      setForm({ titulo: '', autor: '', genero: '', anoPublicacao: '', sinopse: '' });
      setMessage('');
      setCadastroConcluido(true);
    } catch (error) {
      const details = error?.response?.data || error?.message || 'tente novamente.';
      setMessage(`Falha ao cadastrar livro, ${details}`);
      setCadastroConcluido(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
  };

  if (!localStorage.getItem('token')) {
    navigate('/');
    return null;
  }

  return (
    <section className="page cadastro-page">
      <div className="top-row">
        <h1>Cadastrar Livro</h1>
        <div className="actions">
          <button className="btn secondary" onClick={() => navigate('/dashboard')}>← Voltar</button>
          <button className="btn danger" onClick={handleLogout}>Sair</button>
        </div>
      </div>
      <form onSubmit={submit} className="book-form">
        <input name="titulo" value={form.titulo} onChange={handleChange} placeholder="Título" required />
        <input name="autor" value={form.autor} onChange={handleChange} placeholder="Autor" required />
        <input name="genero" value={form.genero} onChange={handleChange} placeholder="Gênero" />
        <input name="anoPublicacao" value={form.anoPublicacao} onChange={handleChange} placeholder="Ano" type="number" min="1000" max="2100" />
        <textarea name="sinopse" value={form.sinopse} onChange={handleChange} placeholder="Sinopse" rows="4" />
        <button type="submit" className="btn primary">Salvar</button>
      </form>

      {message && <p className="info">{message}</p>}

      {cadastroConcluido && (
        <div className="success-actions">
          <p>Livro cadastrado com sucesso! Deseja cadastrar outro?</p>
          <div className="button-group">
            <button className="btn secondary" onClick={() => {
              setForm({ titulo: '', autor: '', genero: '', anoPublicacao: '', sinopse: '' });
              setMessage('');
              setCadastroConcluido(false);
            }}>
              Cadastrar novo livro
            </button>
            <button className="btn primary" onClick={() => navigate('/dashboard')}>
              Voltar ao menu
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

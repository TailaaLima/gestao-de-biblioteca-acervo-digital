import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const navigate = useNavigate();

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
    <section className="page dashboard-page">
      <div className="top-row">
        <div>
          <h1>Acervo Digital Biblioteca</h1>
          <p>Olá, {localStorage.getItem('username') || 'Usuário'}!</p>
        </div>

        <button className="btn danger" onClick={handleLogout}>Sair</button>
      </div>

      <div className="dashboard-content">
        <p className="subtitle">Escolha uma opção para continuar:</p>

        <div className="dashboard-options">
          <div className="option-card" onClick={() => navigate('/cadastro-livro')}>
            <div className="card-icon">📚</div>
            <h2>Cadastrar Livro</h2>
            <p>Adicione um novo livro ao acervo da biblioteca</p>
            <button className="btn primary">Acessar</button>
          </div>

          <div className="option-card" onClick={() => navigate('/acervo')}>
            <div className="card-icon">📖</div>
            <h2>Listar Livros</h2>
            <p>Visualize todos os livros cadastrados no acervo</p>
            <button className="btn primary">Acessar</button>
          </div>
        </div>
      </div>
    </section>
  );
}

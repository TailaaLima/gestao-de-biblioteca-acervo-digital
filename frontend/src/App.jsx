import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AcervoPage from './pages/AcervoPage';
import CadastroLivroPage from './pages/CadastroLivroPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/acervo" element={<AcervoPage />} />
        <Route path="/cadastro-livro" element={<CadastroLivroPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

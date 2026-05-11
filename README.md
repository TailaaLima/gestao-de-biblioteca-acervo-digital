# Acervo Digital Biblioteca

Sistema simples de gerenciamento de acervo de livros com frontend em React + Vite e backend em ASP.NET Core (.NET 8).

## Visão geral

- Backend em: `backend/AcervoApi`
- Frontend em: `frontend`
- Banco: SQL Server (LocalDB ou conexão customizada)
- Tabela principal: `AcervoLivros`

### Endpoints principais

- `POST /api/auth/login` (usuário fake: `admin` / `1234`)
- `POST /api/CadastrarLivro` (cadastrar novo livro)
- `GET /api/Livros` (listar todos os livros)
- `GET /api/Livros/{id}` (obter livro por id)
- `PUT /api/Livros/{id}` (editar livro existente)

## Backend (.NET)

### Configuração

1. Abra terminal e vá para a pasta:
   - `cd backend/AcervoApi`
2. Verifique ou configure a string em `appsettings.json`:
   - `DefaultConnection` (por padrão `localdb`) altera se necessário.
3. Execute:
   - `dotnet restore`
   - `dotnet ef database update`
   - `dotnet run`

### Observações

- O backend roda normalmente em `http://localhost:5143` (veja `launchSettings.json`).
- API Swagger: `http://localhost:5143/swagger`

## Frontend (React + Vite)

### Configuração

1. Abra outro terminal e vá para:
   - `cd frontend`
2. Instale dependências:
   - `npm install`
3. Atualize para Node.js >= 22.12.0 (recomendado) para evitar erros de roldown.
4. Rode:
   - `npm run dev`
5. Acesse:
   - `http://localhost:5173`

### Rotas

- `/` - tela de login (nome do projeto: **Acervo Digital Biblioteca**)
- `/dashboard` - dashboard com opções de cadastro e listagem (após login)
- `/cadastro-livro` - formulário de cadastro de livro
- `/acervo` - listagem de livros cadastrados

### Configurar URL da API (se for outra porta)

No arquivo `frontend/src/api.js`, ajuste:

```js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5143/api';
```

Ou em `.env.local`:

```
VITE_API_URL=http://localhost:5143/api
```

## Autenticação

- Usuário: `admin`
- Senha: `1234`

## Solução de problemas

- Se `npm` falhar no PowerShell com política de execução:

```powershell
Set-ExecutionPolicy RemoteSigned -Scope Process
```

- Para build, se houver erro `rolldown`, limpe antes:

```powershell
rm -r node_modules
rm package-lock.json
npm cache clean --force
npm install
```

- Se o frontend tenta acessar porta errada, verifique `frontend/src/api.js`.
- Se algo não carregar, confirme backend em execução e consulte o Swagger.


